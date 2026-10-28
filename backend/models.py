from sqlalchemy import Column, Integer, String, Float, Text, DateTime, JSON
from datetime import datetime
from database import Base

class Application(Base):
    __tablename__ = "applications"

    id = Column(String, primary_key=True, index=True)
    institution_name = Column(String, index=True)
    region = Column(String)
    app_type = Column(String)
    academic_year = Column(String, default="2026-27")
    current_stage = Column(String, default="SUBMITTED")
    status = Column(String, default="IN_PROGRESS")
    compliance_score = Column(Float, default=0.0)
    tamper_risk_score = Column(Float, default=0.0)
    assigned_officer = Column(String)
    created_at = Column(String, default=lambda: datetime.now().strftime("%Y-%m-%d %H:%M"))

class Document(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True, index=True)
    app_id = Column(String, index=True)
    filename = Column(String)
    file_type = Column(String)
    ocr_confidence = Column(Float, default=0.0)
    extracted_data = Column(JSON, default={})
    tamper_analysis = Column(JSON, default={})
    status = Column(String, default="VERIFIED")
    uploaded_at = Column(String, default=lambda: datetime.now().strftime("%Y-%m-%d %H:%M"))

class Finding(Base):
    __tablename__ = "findings"

    id = Column(String, primary_key=True, index=True)
    app_id = Column(String, index=True)
    rule_id = Column(String)
    category = Column(String)
    severity = Column(String)
    message = Column(Text)
    evidence_reference = Column(String)
    status = Column(String, default="PENDING_REVIEW")

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, index=True)
    app_id = Column(String, index=True)
    actor_name = Column(String)
    actor_role = Column(String)
    action = Column(String)
    details = Column(Text)
    timestamp = Column(String, default=lambda: datetime.now().strftime("%Y-%m-%d %H:%M"))
