from io import BytesIO

from fastapi import HTTPException, status
from pypdf import PdfReader


def extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        reader = PdfReader(BytesIO(file_bytes))
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unable to read PDF file",
        )

    text_parts = []

    for page in reader.pages:
        page_text = page.extract_text() or ""
        text_parts.append(page_text)

    text = "\n".join(text_parts).strip()

    if not text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No readable text found in the PDF",
        )

    return text

