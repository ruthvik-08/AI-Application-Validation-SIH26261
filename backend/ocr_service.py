import io
import re
from PIL import Image
import pytesseract
from pypdf import PdfReader

# Explicit path for Apple Silicon Homebrew Tesseract
pytesseract.pytesseract.tesseract_cmd = "/opt/homebrew/bin/tesseract"

def extract_text_from_bytes(file_bytes: bytes, filename: str) -> dict:
    extracted_text = ""
    confidence = 0.85

    # 1. Extract text from PDF or Image
    if filename.lower().endswith(".pdf"):
        try:
            reader = PdfReader(io.BytesIO(file_bytes))
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    extracted_text += text + "\n"
            confidence = 0.95
        except Exception:
            extracted_text = ""
    else:
        try:
            image = Image.open(io.BytesIO(file_bytes))
            # Run pytesseract OCR
            data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)
            extracted_text = pytesseract.image_to_string(image)
            
            # Calculate average OCR confidence from non-empty words
            confs = [int(c) for c, w in zip(data["conf"], data["text"]) if str(c).isdigit() and int(c) > 0 and w.strip()]
            if confs:
                confidence = round(sum(confs) / (len(confs) * 100), 2)
            else:
                confidence = 0.80
        except Exception:
            extracted_text = ""

    # 2. Extract structured fields with tolerant regex patterns
    fields = {}

    # Faculty count regex (matches: "Faculty Count: 85", "Faculty: 85", "Total Faculty 85")
    faculty_match = re.search(r"(?:faculty(?:\s+count)?|teachers?)\s*[:=-]?\s*(\d+)", extracted_text, re.IGNORECASE)
    if faculty_match:
        fields["faculty_count"] = int(faculty_match.group(1))

    # Student enrollment regex (matches: "Student Enrollment: 1360", "Students: 1360", "Enrollment: 1360")
    student_match = re.search(r"(?:students?(?:\s+enrollment)?|intake|enrollment)\s*[:=-]?\s*(\d+)", extracted_text, re.IGNORECASE)
    if student_match:
        fields["student_enrollment"] = int(student_match.group(1))

    # Built-up area regex (matches: "Built-up Area: 18500", "Area: 18500 sqft")
    area_match = re.search(r"(?:built[- ]?up\s+area|campus\s+area|area)\s*[:=-]?\s*(\d+)", extracted_text, re.IGNORECASE)
    if area_match:
        fields["built_up_sqft"] = int(area_match.group(1))

    # PhD percentage regex (matches: "PhD: 42%", "PhD Share: 42")
    phd_match = re.search(r"ph\.?d(?:\s*share|\s*percentage)?\s*[:=-]?\s*(\d+)\s*%?", extracted_text, re.IGNORECASE)
    if phd_match:
        fields["phd_percent"] = int(phd_match.group(1))

    return {
        "text": extracted_text,
        "confidence": confidence,
        "extracted_fields": fields
    }
