"""
Authentication / Tamper Detection Service.

Implements Error Level Analysis (ELA) using OpenCV + PIL to detect
digital tampering in uploaded document images, returning a
"Tamper Confidence Score" in the range [0, 1].
"""

from __future__ import annotations

import io
import logging
import math
from pathlib import Path
from typing import Any

import cv2
import numpy as np
from PIL import Image, ImageChops, ImageEnhance

logger = logging.getLogger(__name__)


# ──────────────────────────────────────────────────────────────────────────────
# ELA helpers
# ──────────────────────────────────────────────────────────────────────────────

def _perform_ela(image_bytes: bytes, quality: int = 90) -> tuple[np.ndarray, np.ndarray]:
    """
    Perform Error Level Analysis.

    1. Save the image at a known JPEG quality (introducing uniform artefacts).
    2. Compare the original with the re-saved copy — areas that were *already*
       re-saved (i.e. edited) show higher error levels.

    Returns:
        original_arr:  H×W×3 uint8 numpy array of the original.
        ela_arr:       H×W×3 uint8 numpy array of the ELA difference image.
    """
    # Decode original
    pil_img = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    # Re-save at reference quality into a buffer
    buf = io.BytesIO()
    pil_img.save(buf, "JPEG", quality=quality)
    buf.seek(0)
    resaved = Image.open(buf).convert("RGB")

    # Amplified difference
    ela_img = ImageChops.difference(pil_img, resaved)
    enhancer = ImageEnhance.Brightness(ela_img)
    ela_img = enhancer.enhance(20)

    original_arr = np.array(pil_img)
    ela_arr = np.array(ela_img)
    return original_arr, ela_arr


def _compute_tamper_score(ela_arr: np.ndarray) -> float:
    """
    Derive a tamper confidence score from the ELA image.

    High mean ELA brightness in a non-uniform pattern → high tamper score.

    Score formula (empirical):
        base  = mean(ELA) / 255
        var   = std(ELA) / 128          # pattern irregularity
        score = clamp(base * 1.5 + var * 0.5, 0, 1)
    """
    gray = cv2.cvtColor(ela_arr, cv2.COLOR_RGB2GRAY).astype(np.float32)
    mean_val = float(np.mean(gray))
    std_val = float(np.std(gray))

    base = mean_val / 255.0
    irregularity = std_val / 128.0
    raw_score = base * 1.5 + irregularity * 0.5
    score = max(0.0, min(1.0, raw_score))
    return round(score, 4)


def _highlight_suspect_regions(ela_arr: np.ndarray) -> list[dict[str, int]]:
    """
    Find bounding boxes of high-error regions using contour detection.

    Returns a list of {x, y, w, h} dicts (top-N by area).
    """
    gray = cv2.cvtColor(ela_arr, cv2.COLOR_RGB2GRAY)
    _, thresh = cv2.threshold(gray, 50, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    boxes = []
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if area < 200:          # ignore tiny noise
            continue
        x, y, w, h = cv2.boundingRect(cnt)
        boxes.append({"x": int(x), "y": int(y), "w": int(w), "h": int(h), "area": int(area)})

    # Return top-5 suspect regions by area
    boxes.sort(key=lambda b: b["area"], reverse=True)
    return boxes[:5]


# ──────────────────────────────────────────────────────────────────────────────
# Additional heuristic checks
# ──────────────────────────────────────────────────────────────────────────────

def _check_metadata_consistency(image_bytes: bytes) -> dict[str, Any]:
    """Check EXIF / image metadata for signs of re-editing."""
    try:
        pil_img = Image.open(io.BytesIO(image_bytes))
        exif_data = pil_img.getexif()
        flags: list[str] = []

        software_tag = 305  # EXIF tag for Software
        if software_tag in exif_data:
            software = str(exif_data[software_tag]).lower()
            editing_tools = ["photoshop", "gimp", "lightroom", "affinity", "paint"]
            if any(t in software for t in editing_tools):
                flags.append(f"Editing software detected in EXIF: {exif_data[software_tag]}")

        return {"exif_flags": flags, "has_exif": len(exif_data) > 0}
    except Exception as exc:
        logger.debug("Metadata check skipped: %s", exc)
        return {"exif_flags": [], "has_exif": False}


def _noise_consistency_check(original_arr: np.ndarray) -> float:
    """
    Check for inconsistent noise levels across image blocks (block-level analysis).
    Returns a noise-inconsistency score [0, 1] — higher means more suspicious.
    """
    gray = cv2.cvtColor(original_arr, cv2.COLOR_RGB2GRAY).astype(np.float32)
    h, w = gray.shape
    block_size = 64
    block_stds: list[float] = []

    for r in range(0, h - block_size, block_size):
        for c in range(0, w - block_size, block_size):
            block = gray[r : r + block_size, c : c + block_size]
            block_stds.append(float(np.std(block)))

    if len(block_stds) < 4:
        return 0.0

    overall_std = float(np.std(block_stds))
    # Normalise: naturally noisy documents have std ~5-15; high inconsistency >30
    score = min(1.0, overall_std / 40.0)
    return round(score, 4)


# ──────────────────────────────────────────────────────────────────────────────
# Public API
# ──────────────────────────────────────────────────────────────────────────────

def authenticate_document(file_bytes: bytes, filename: str = "") -> dict[str, Any]:
    """
    Run full tamper-detection pipeline on *file_bytes*.

    Args:
        file_bytes: Raw bytes of the uploaded document image.
        filename:   Original filename (for logging only).

    Returns:
        {
            "tamper_confidence_score": float,   # 0 = clean, 1 = highly suspect
            "risk_level": str,                  # "LOW" | "MEDIUM" | "HIGH"
            "ela_mean_brightness": float,
            "suspect_regions": list[dict],
            "noise_inconsistency_score": float,
            "metadata": dict,
            "verdict": str,
        }
    """
    if not file_bytes:
        raise ValueError("Received empty file bytes.")

    try:
        original_arr, ela_arr = _perform_ela(file_bytes)
    except Exception as exc:
        raise ValueError(f"Cannot perform ELA — unsupported image format: {exc}") from exc

    tamper_score = _compute_tamper_score(ela_arr)
    suspect_regions = _highlight_suspect_regions(ela_arr)
    noise_score = _noise_consistency_check(original_arr)
    metadata = _check_metadata_consistency(file_bytes)

    # Composite score (weighted)
    composite = tamper_score * 0.6 + noise_score * 0.3 + (0.1 if metadata["exif_flags"] else 0.0)
    composite = round(min(1.0, composite), 4)

    ela_gray = cv2.cvtColor(ela_arr, cv2.COLOR_RGB2GRAY)
    ela_mean = round(float(np.mean(ela_gray)), 4)

    if composite < 0.25:
        risk_level = "LOW"
        verdict = "Document appears AUTHENTIC. No significant tampering detected."
    elif composite < 0.55:
        risk_level = "MEDIUM"
        verdict = "Document shows MODERATE anomalies. Manual review recommended."
    else:
        risk_level = "HIGH"
        verdict = "Document flagged as POTENTIALLY TAMPERED. Reject and request original."

    logger.info(
        "Auth check for '%s': composite=%.4f, risk=%s, regions=%d",
        filename,
        composite,
        risk_level,
        len(suspect_regions),
    )

    return {
        "tamper_confidence_score": composite,
        "risk_level": risk_level,
        "ela_mean_brightness": ela_mean,
        "suspect_regions": suspect_regions,
        "noise_inconsistency_score": noise_score,
        "metadata": metadata,
        "verdict": verdict,
    }
