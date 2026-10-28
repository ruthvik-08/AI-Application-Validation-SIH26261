from typing import Optional
from sqlalchemy.orm import Session
from models import Application, Document, Finding

AICTE_RULES = {
    "ratio": (
        "AICTE Norm (Chapter IV, Clause 4.1): The mandatory student-to-faculty ratio for technical "
        "undergraduate programmes (B.Tech/B.E.) is 20:1. For postgraduate programmes (M.Tech), "
        "the ratio is 15:1. Diploma institutions require 25:1."
    ),
    "cadre": (
        "AICTE Cadre Ratio: Faculty structure must adhere to 1 Professor : 2 Associate Professors : 6 Assistant Professors."
    ),
    "area": (
        "AICTE Infrastructure Norm (Chapter V): Engineering institutions offering up to 3 technical "
        "programmes must provide a minimum instructional and administrative built-up area of 10,000 sq. ft. "
        "Each additional programme requires an incremental 3,500 sq. ft."
    ),
    "tamper": (
        "ELA Tamper Forensics: Error Level Analysis re-saves images at a known 95% JPEG quality grid. "
        "Digital splices, cloned signatures, or altered numerical bounding boxes display distinct compression "
        "differentials that flag high tamper risk."
    ),
    "committees": (
        "AICTE Mandatory Compliance Committees: Institutions must constitute an Internal Complaint Committee (ICC), "
        "Anti-Ragging Committee, SC/ST Grievance Cell, and Institution Industry Cell (IIC)."
    )
}

def generate_assistant_reply(query: str, app_id: Optional[str], db: Session) -> str:
    q = query.lower().strip()

    # 1. Fetch current application context from database
    app_obj = None
    if app_id:
        app_obj = db.query(Application).filter(Application.id == app_id).first()
    if not app_obj:
        app_obj = db.query(Application).first()

    docs = db.query(Document).filter(Document.app_id == app_obj.id).all() if app_obj else []
    findings = db.query(Finding).filter(Finding.app_id == app_obj.id).all() if app_obj else []

    # 2. Application status & overview
    if any(k in q for k in ["status", "overview", "summary", "score", "approved", "current stage"]):
        if not app_obj:
            return "No active applications found in the queue."
        return (
            f"📋 Application Overview for {app_obj.institution_name} ({app_obj.id}):\n\n"
            f"• Current Workflow Stage: {app_obj.current_stage}\n"
            f"• Status: {app_obj.status}\n"
            f"• Compliance Score: {app_obj.compliance_score}%\n"
            f"• Tamper Risk Index: {int(app_obj.tamper_risk_score * 100)}%\n"
            f"• Assigned Officer: {app_obj.assigned_officer}\n"
            f"• Region & Academic Year: {app_obj.region} | {app_obj.academic_year}"
        )

    # 3. Discrepancies, flags & reasons for failure
    if any(k in q for k in ["why", "flag", "discrepanc", "issue", "violation", "fail"]):
        if not findings or len(findings) == 0:
            return f"✅ Good news! Application {app_obj.id} has no active or unresolved discrepancies."

        issue_lines = []
        for idx, f in enumerate(findings, 1):
            issue_lines.append(f"{idx}. [{f.rule_id}] {f.severity}: {f.message} (Evidence: {f.evidence_reference})")

        return (
            f"⚠️ Active Findings & Discrepancies for {app_obj.institution_name}:\n\n"
            + "\n".join(issue_lines)
            + "\n\nAsk 'What should the institution do next?' for remediation guidance."
        )

    # 4. Remediation & next steps
    if any(k in q for k in ["next step", "what should", "remediat", "how to resolve", "action"]):
        if not findings or len(findings) == 0:
            return f"Application {app_obj.id} is fully compliant and ready for final Bureau official sign-off."

        actions = []
        for f in findings:
            msg_lower = f.message.lower()
            if "ratio" in msg_lower or "faculty" in msg_lower:
                actions.append("• Faculty Deficit: Submit updated Form-16/EPFO records or recruit qualified staff to satisfy the mandatory 1:20 student-faculty ratio.")
            elif "area" in msg_lower or "built-up" in msg_lower:
                actions.append("• Infrastructure Deficit: Upload a registered architect certificate validating at least 10,000 sq.ft. of carpet area.")
            else:
                actions.append(f"• Resolve {f.rule_id}: Upload revised, notarized documentary proof to supersede this finding.")

        return (
            f"🛠️ Recommended Action Plan for {app_obj.institution_name}:\n\n"
            + "\n".join(actions)
            + "\n\nOnce corrected documents are uploaded, click 'Run full compliance re-check' to clear findings."
        )

    # 5. Document forensics & tampering / ELA
    if any(k in q for k in ["tamper", "ela", "authenticity", "fake", "forged", "anomaly"]):
        if not docs:
            return "No documents have been uploaded for forensic inspection yet."

        lines = []
        for d in docs:
            details = d.tamper_analysis.get("details", "No anomalies") if isinstance(d.tamper_analysis, dict) else str(d.tamper_analysis)
            lines.append(f"• {d.filename}: {details}")

        return (
            f"🔍 Document Forensics & ELA Inspection:\n\n"
            + "\n".join(lines)
            + f"\n\n{AICTE_RULES['tamper']}"
        )

    # 6. Extracted data & OCR parsed numbers
    if any(k in q for k in ["extract", "student count", "faculty count", "numbers", "area", "phd"]):
        if not docs:
            return "No disclosures have been parsed yet."

        first_doc = docs[0]
        data = first_doc.extracted_data or {}
        return (
            f"📊 OCR Extracted Fields from {first_doc.filename}:\n\n"
            f"• Faculty Count: {data.get('faculty_count', 'N/A')}\n"
            f"• Student Enrollment: {data.get('student_enrollment', 'N/A')}\n"
            f"• Built-up Area: {data.get('built_up_sqft', 'N/A')} sq.ft.\n"
            f"• PhD Qualified Faculty: {data.get('phd_percent', 'N/A')}%\n"
            f"• Extraction Confidence: {int(first_doc.ocr_confidence * 100)}%"
        )

    # 7. Ghost faculty & EPFO cross-checks
    if any(k in q for k in ["ghost", "epfo", "duplicate", "provident", "pan"]):
        return (
            "🕵️ National EPFO Cross-Check Logic:\n\n"
            "We match institutional faculty PAN hashes with the Employees' Provident Fund Organization (EPFO) "
            "database. Staff members registered with active salary contributions across multiple institutions "
            "are immediately tagged as DUPLICATE / GHOST FACULTY."
        )

    # 8. Regulatory AICTE Norms
    if "ratio" in q:
        return AICTE_RULES["ratio"]
    if "area" in q or "sqft" in q:
        return AICTE_RULES["area"]
    if "cadre" in q or "professor" in q:
        return AICTE_RULES["cadre"]
    if "committee" in q or "icc" in q or "ragging" in q:
        return AICTE_RULES["committees"]

    # 9. General Fallback
    return (
        f"I am actively monitoring application {app_obj.id} ({app_obj.institution_name}).\n\n"
        "You can ask me:\n"
        "• Why was this application flagged?\n"
        "• What is the compliance score & status?\n"
        "• What should the institution do next?\n"
        "• Show extracted OCR fields\n"
        "• Did any document fail tamper analysis?"
    )
