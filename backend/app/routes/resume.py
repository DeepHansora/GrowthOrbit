from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from app.models.user import User
from app.schemas.resume import ResumeAnalysisResponse
from app.services.resume_service import analyze_resume_with_gemini
from app.utils.auth import get_current_user
from app.utils.pdf import extract_text_from_pdf

router = APIRouter()


@router.post("/resume-analysis", response_model=ResumeAnalysisResponse)
async def analyze_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are supported",
        )

    file_bytes = await file.read()

    if not file_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty",
        )

    resume_text = extract_text_from_pdf(file_bytes)

    return analyze_resume_with_gemini(resume_text)

