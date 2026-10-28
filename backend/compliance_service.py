"""
Compliance Service — Mock RAG pipeline using ChromaDB + LangChain.

Stores AICTE norms as vector documents and uses semantic search to
retrieve the most relevant rules for extracted document metrics,
then computes a PASS/FAIL verdict per criterion.
"""

from __future__ import annotations

import logging
import os
from typing import Any

import chromadb
from chromadb.config import Settings

logger = logging.getLogger(__name__)

# ──────────────────────────────────────────────────────────────────────────────
# AICTE norms knowledge base (mock corpus)
# ──────────────────────────────────────────────────────────────────────────────

AICTE_NORMS: list[dict[str, Any]] = [
    {
        "id": "norm_001",
        "category": "Faculty",
        "rule": "Faculty to student ratio must not exceed 1:20 for engineering programmes.",
        "metric_key": "faculty_student_ratio",
        "threshold": {"max_ratio": 20},
    },
    {
        "id": "norm_002",
        "category": "Faculty Qualification",
        "rule": "At least 50% of faculty in any technical institution must hold a Ph.D. degree.",
        "metric_key": "phd_faculty_percent",
        "threshold": {"min_percent": 50.0},
    },
    {
        "id": "norm_003",
        "category": "Infrastructure",
        "rule": "Minimum built-up area for an engineering institution must be 10,000 sq. ft. per programme.",
        "metric_key": "built_up_area_sqft",
        "threshold": {"min_sqft": 10000},
    },
    {
        "id": "norm_004",
        "category": "Student Enrollment",
        "rule": "Maximum student intake per batch for a single engineering programme is 120.",
        "metric_key": "student_enrollment",
        "threshold": {"max_enrollment": 120},
    },
    {
        "id": "norm_005",
        "category": "Library",
        "rule": "Institution must have a digital library with a minimum of 5000 e-books.",
        "metric_key": "ebooks_count",
        "threshold": {"min_ebooks": 5000},
    },
    {
        "id": "norm_006",
        "category": "Internet",
        "rule": "Minimum internet bandwidth must be 1 Gbps for institutions with >500 students.",
        "metric_key": "internet_bandwidth_gbps",
        "threshold": {"min_gbps": 1},
    },
    {
        "id": "norm_007",
        "category": "Laboratories",
        "rule": "Each programme must have dedicated laboratories with equipment worth ≥ ₹10 lakhs.",
        "metric_key": "lab_equipment_value_lakhs",
        "threshold": {"min_lakhs": 10},
    },
    {
        "id": "norm_008",
        "category": "Safety",
        "rule": "Institutions must have a functional fire safety system and emergency exits as per NBC 2016.",
        "metric_key": "fire_safety_compliant",
        "threshold": {"required": True},
    },
]


# ──────────────────────────────────────────────────────────────────────────────
# ChromaDB setup & seeding
# ──────────────────────────────────────────────────────────────────────────────

_chroma_client: chromadb.ClientAPI | None = None
_collection: Any = None


def _get_collection() -> Any:
    """Return (and lazily initialise) the ChromaDB collection."""
    global _chroma_client, _collection
    if _collection is not None:
        return _collection

    persist_dir = os.path.join(os.path.dirname(__file__), ".chromadb")
    os.makedirs(persist_dir, exist_ok=True)

    _chroma_client = chromadb.Client(Settings(
        anonymized_telemetry=False,
        is_persistent=True,
        persist_directory=persist_dir,
    ))

    _collection = _chroma_client.get_or_create_collection(
        name="aicte_norms",
        metadata={"hnsw:space": "cosine"},
    )

    # Seed the collection if it's empty
    if _collection.count() == 0:
        logger.info("Seeding ChromaDB with AICTE norms …")
        _collection.add(
            documents=[n["rule"] for n in AICTE_NORMS],
            ids=[n["id"] for n in AICTE_NORMS],
            metadatas=[
                {"category": n["category"], "metric_key": n["metric_key"]}
                for n in AICTE_NORMS
            ],
        )
        logger.info("ChromaDB seeded with %d norms.", len(AICTE_NORMS))

    return _collection


# ──────────────────────────────────────────────────────────────────────────────
# Compliance evaluation helpers
# ──────────────────────────────────────────────────────────────────────────────

def _parse_ratio(ratio_str: str) -> float:
    """Convert '1:20' or '1/20' → float (students per faculty)."""
    for sep in [":", "/", "-"]:
        if sep in ratio_str:
            parts = ratio_str.split(sep)
            if len(parts) == 2:
                try:
                    return float(parts[1].strip()) / float(parts[0].strip())
                except ValueError:
                    pass
    return float("inf")


def _evaluate_norm(norm: dict[str, Any], metrics: dict[str, Any]) -> dict[str, Any]:
    """
    Check whether *metrics* satisfies *norm*.

    Returns:
        {
            "norm_id": str,
            "category": str,
            "rule": str,
            "metric_key": str,
            "provided_value": Any | None,
            "threshold": dict,
            "status": "PASS" | "FAIL" | "NOT_CHECKED",
            "message": str,
        }
    """
    key = norm["metric_key"]
    threshold = norm["threshold"]
    provided = metrics.get(key)

    base = {
        "norm_id": norm["id"],
        "category": norm["category"],
        "rule": norm["rule"],
        "metric_key": key,
        "provided_value": provided,
        "threshold": threshold,
    }

    if provided is None:
        return {**base, "status": "NOT_CHECKED", "message": f"Metric '{key}' not found in document."}

    # Faculty-to-student ratio check
    if key == "faculty_student_ratio":
        ratio = _parse_ratio(str(provided))
        max_ratio = threshold["max_ratio"]
        if ratio <= max_ratio:
            return {**base, "status": "PASS", "message": f"Ratio {provided} (1:{ratio:.0f}) ≤ 1:{max_ratio}. ✓"}
        return {**base, "status": "FAIL", "message": f"Ratio {provided} (1:{ratio:.0f}) exceeds 1:{max_ratio}. ✗"}

    # PhD percentage
    if key == "phd_faculty_percent":
        if float(provided) >= threshold["min_percent"]:
            return {**base, "status": "PASS", "message": f"{provided}% ≥ {threshold['min_percent']}% PhD faculty. ✓"}
        return {**base, "status": "FAIL", "message": f"{provided}% < {threshold['min_percent']}% PhD faculty. ✗"}

    # Built-up area
    if key == "built_up_area_sqft":
        if int(provided) >= threshold["min_sqft"]:
            return {**base, "status": "PASS", "message": f"{provided} sq.ft ≥ {threshold['min_sqft']} sq.ft. ✓"}
        return {**base, "status": "FAIL", "message": f"{provided} sq.ft < {threshold['min_sqft']} sq.ft. ✗"}

    # Student enrollment
    if key == "student_enrollment":
        if int(provided) <= threshold["max_enrollment"]:
            return {**base, "status": "PASS", "message": f"Enrollment {provided} ≤ {threshold['max_enrollment']}. ✓"}
        return {**base, "status": "FAIL", "message": f"Enrollment {provided} exceeds max {threshold['max_enrollment']}. ✗"}

    # Boolean checks (fire safety, etc.)
    if "required" in threshold:
        if bool(provided) == threshold["required"]:
            return {**base, "status": "PASS", "message": f"{key} requirement satisfied. ✓"}
        return {**base, "status": "FAIL", "message": f"{key} requirement NOT satisfied. ✗"}

    # Generic numeric min/max
    for op, tval in threshold.items():
        try:
            if op.startswith("min") and float(provided) < float(tval):
                return {**base, "status": "FAIL", "message": f"{provided} below minimum {tval}. ✗"}
            if op.startswith("max") and float(provided) > float(tval):
                return {**base, "status": "FAIL", "message": f"{provided} exceeds maximum {tval}. ✗"}
        except (ValueError, TypeError):
            pass

    return {**base, "status": "PASS", "message": "Meets requirement. ✓"}


# ──────────────────────────────────────────────────────────────────────────────
# Public API
# ──────────────────────────────────────────────────────────────────────────────

def verify_compliance(metrics: dict[str, Any]) -> dict[str, Any]:
    """
    Compare extracted *metrics* against stored AICTE norms using RAG retrieval.

    Args:
        metrics: Dict from ocr_service.extract_text_from_bytes["extracted_fields"].

    Returns:
        {
            "overall_status": "COMPLIANT" | "NON_COMPLIANT" | "PARTIAL",
            "compliance_score": float,       # 0-100
            "checked": int,
            "passed": int,
            "failed": int,
            "not_checked": int,
            "results": list[dict],           # per-norm results
            "retrieved_norms": list[str],    # IDs retrieved via RAG
        }
    """
    collection = _get_collection()

    # Build query from the available metric keys
    query_text = " ".join(metrics.keys()) if metrics else "AICTE compliance norms"
    retrieved = collection.query(
        query_texts=[query_text],
        n_results=min(len(AICTE_NORMS), 8),
        include=["documents", "metadatas"],  # ids are always returned by default
    )

    retrieved_ids: list[str] = retrieved["ids"][0] if retrieved.get("ids") else []
    logger.info("RAG retrieved norm IDs: %s", retrieved_ids)

    # Evaluate all norms (full coverage regardless of retrieval order)
    norm_lookup = {n["id"]: n for n in AICTE_NORMS}
    ordered_norms = [norm_lookup[nid] for nid in retrieved_ids if nid in norm_lookup]
    # Add any norms not in retrieval set
    ordered_norms += [n for n in AICTE_NORMS if n["id"] not in retrieved_ids]

    results = [_evaluate_norm(norm, metrics) for norm in ordered_norms]

    passed = sum(1 for r in results if r["status"] == "PASS")
    failed = sum(1 for r in results if r["status"] == "FAIL")
    not_checked = sum(1 for r in results if r["status"] == "NOT_CHECKED")
    checked = passed + failed

    compliance_score = (passed / checked * 100) if checked > 0 else 0.0

    if failed == 0 and checked > 0:
        overall_status = "COMPLIANT"
    elif passed == 0 or compliance_score < 50:
        overall_status = "NON_COMPLIANT"
    else:
        overall_status = "PARTIAL"

    return {
        "overall_status": overall_status,
        "compliance_score": round(compliance_score, 2),
        "checked": checked,
        "passed": passed,
        "failed": failed,
        "not_checked": not_checked,
        "results": results,
        "retrieved_norms": retrieved_ids,
    }
