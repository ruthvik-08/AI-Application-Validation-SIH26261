<div align="center">

# AI-Powered Application Validation, Document Authentication & Regulatory Compliance Verification

### Team 404 · Smart India Hackathon 2026

**Problem Statement:** SIH26261 · **Organization:** AICTE · **Theme:** Smart Automation

A verification platform designed to help reviewers validate applications, examine supporting documents, identify inconsistencies, and assess submissions against configurable compliance requirements.

</div>

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
- [Capabilities](#capabilities)
- [Technology Stack](#technology-stack)
- [System Workflow](#system-workflow)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Security and Responsible AI](#security-and-responsible-ai)
- [Limitations](#limitations)
- [Roadmap](#roadmap)
- [Team](#team)

## Overview

Application and document verification can involve repetitive checks, manual data entry, and comparisons across multiple records. These processes may be slow and can lead to missed inconsistencies.

**Team 404** is developing an AI-assisted system to make this workflow more organized and transparent. The project combines a web interface with backend services for application processing, document analysis, and compliance checks.

The system is intended to help a reviewer understand **what passed, what needs attention, and why**. Suspicious indicators are intended to trigger further review—not to be treated as automatic proof of fraud.

## Problem Statement

**SIH26261 — AI-Powered Application Validation, Document Authentication and Regulatory Compliance Verification**

- **Organization:** AICTE
- **Hackathon:** Smart India Hackathon 2026
- **Theme:** Smart Automation
- **Team:** 4O4
- **Team:** 4O4

The challenge is to reduce the effort required to review applications and their supporting documents while improving consistency, traceability, and clarity in the verification process.

## Objectives

- Check applications for required fields and incomplete information.
- Extract useful text from supported documents where OCR is available.
- Compare application details with information found in supporting documents.
- Flag possible inconsistencies or suspicious document characteristics for human review.
- Evaluate submissions against clearly defined compliance rules.
- Present findings in a readable format so reviewers can investigate issues efficiently.

## Capabilities

The project is being developed around the following workflow. Availability of each capability depends on the implementation and configuration in the current version.

| Area | Intended capability |
|---|---|
| Application validation | Check required fields, formats, and missing information. |
| Document processing | Accept supported documents and extract text using OCR where configured. |
| Cross-document checks | Compare extracted details with application information and flag mismatches. |
| Document review | Surface suspicious indicators for additional inspection; do not treat them as conclusive proof of tampering. |
| Compliance checks | Evaluate submissions against implemented rules and explain unmet requirements. |
| Review dashboard | Present validation results, warnings, and findings in one place. |

> **Implementation note:** This repository is an evolving hackathon project. Do not assume every capability listed above is complete or production-ready. Verify the current implementation and test results before relying on a feature.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Backend API | Python, FastAPI, Uvicorn |
| Database layer | SQLite, SQLAlchemy |
| Document processing | OCR and document-analysis services, depending on configuration |
| Package management | npm and pip |
| Version control | Git and GitHub |

## System Workflow

1. A reviewer enters application information and/or submits supporting documents.
2. The frontend sends the relevant data to the backend.
3. Backend services run the validation and document-processing steps that are implemented and configured.
4. Available compliance rules are evaluated against the submission.
5. The frontend displays results, warnings, and items that need review.
6. A human reviewer investigates flagged issues before making a consequential decision.

## Project Structure

```text
AI-Application-Validation-SIH26261/
├── backend/
│   ├── main.py
│   ├── auth_service.py
│   ├── compliance_service.py
│   ├── database.py
│   ├── models.py
│   ├── ocr_service.py
│   └── requirements.txt
├── frontend/
│   ├── app/
│   ├── package.json
│   ├── package-lock.json
│   └── next.config.mjs
├── .gitignore
└── README.md
```

*The tree above highlights the main files currently documented for the project. Additional files may exist in the repository.*

## Getting Started

These instructions are for running the project locally on macOS or Linux. Run the backend and frontend in **separate terminal windows**.

### Prerequisites

Install:

- Python 3
- Node.js and npm
- Git

Check that they are available:

```bash
python3 --version
node --version
npm --version
git --version
```

### 1. Get the project

If you have not already cloned the repository:

```bash
git clone https://github.com/ruthvik-08/AI-Application-Validation-SIH26261.git
cd AI-Application-Validation-SIH26261
```

If the project folder is already on your computer, open a terminal in that folder instead.

### 2. Set up and start the backend

From the repository root:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Keep this terminal open. The backend should be available at `http://127.0.0.1:8000` if startup succeeds.

**If you already have a backend virtual environment**, activate it and install the requirements as needed rather than creating another environment.

### 3. Set up and start the frontend

Open a second terminal at the repository root, then run:

```bash
cd frontend
npm install
npm run dev
```

When the frontend starts successfully, open:

- **Web application:** http://localhost:3000

### 4. Check the API

If the backend is running, open:

- **Interactive API documentation:** http://127.0.0.1:8000/docs
- **Alternative API documentation:** http://127.0.0.1:8000/redoc

The endpoints shown there depend on the routes implemented in the backend.

### Troubleshooting

- **`uvicorn: command not found`:** Confirm the backend virtual environment is activated and `requirements.txt` installed successfully.
- **`npm run dev` fails:** Run the command from `frontend/` and check that `npm install` completed successfully.
- **Frontend cannot reach backend:** Check the API base URL and backend CORS configuration used by the frontend.
- **Port already in use:** Stop the other process or configure a different port and update the corresponding frontend API settings.
- **Missing configuration:** Check the project code and dependency files for required environment variables. Never commit secret values to Git.

## API Documentation

FastAPI can provide interactive endpoint documentation at `/docs` while the backend is running. Use it to inspect the available routes and test supported requests.

This README does not define endpoints that may not exist in the current implementation.

## Security and Responsible AI

Applications and supporting documents may contain sensitive personal information. Before using real data:

- Do not commit identity documents, private application files, database contents, passwords, API keys, or access tokens.
- Keep secrets in environment variables or an untracked local environment file.
- Restrict access to uploaded documents and remove temporary files when they are no longer needed.
- Validate file types and sizes; do not trust a filename or extension alone.
- Treat OCR output as potentially inaccurate and allow reviewers to correct extraction errors.
- Explain why a rule was triggered and, where practical, identify the rule or source used.
- Keep human review in the loop for high-impact decisions.

**Important:** A mismatch or suspicious image indicator is not, by itself, proof that a document is forged. Likewise, a successful automated check does not guarantee legal or regulatory compliance. Results should be reviewed by an authorized person against the applicable official requirements.

## Limitations

- Results depend on the quality of submitted files, OCR performance, implemented validation logic, and configured compliance rules.
- Scans, low-resolution images, unusual layouts, and handwritten text may reduce extraction accuracy.
- Document analysis may flag legitimate files for review and may miss some suspicious alterations.
- Compliance rules must be maintained and checked against authoritative, current sources.
- The project should be treated as a hackathon prototype unless and until its reliability, security, performance, and legal requirements have been independently evaluated.

## Roadmap

Potential next steps for the project include:

- [ ] Add a reproducible set of sample applications and synthetic test documents.
- [ ] Add unit and integration tests for validation and compliance rules.
- [ ] Measure OCR quality and document-mismatch detection on a labelled test set.
- [ ] Show clear explanations and severity levels for each finding.
- [ ] Add downloadable verification reports, if not already implemented.
- [ ] Add audit history and role-based access controls.
- [ ] Document supported file types, size limits, API endpoints, and configuration.
- [ ] Test upload handling, privacy controls, and error cases before any real-world deployment.

## Team

**Team 404**  
**Team 4O4**  
**Project:** AI-Powered Application Validation, Document Authentication & Regulatory Compliance Verification  
**Hackathon:** Smart India Hackathon 2026  
**Problem Statement:** SIH26261 · AICTE · Smart Automation

---

<div align="center">

**Team 4O4 — Building smarter verification workflows through automation.**

</div>
git add README.md
