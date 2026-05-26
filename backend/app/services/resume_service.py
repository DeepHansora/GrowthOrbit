import json
import re

from fastapi import HTTPException, status
from google import genai

from app.config.settings import settings


def build_resume_prompt(resume_text: str) -> str:
    return f"""
You are an expert career coach and ATS resume reviewer.

Analyze this resume and return ONLY valid JSON with these exact keys:
strengths, weaknesses, missing_skills, suggestions, ats_tips.

Each key must contain an array of short, practical strings.
Do not include markdown, commentary, or code fences.

Resume text:
{resume_text[:12000]}
"""


def parse_gemini_json(text: str) -> dict:
    cleaned_text = text.strip()
    cleaned_text = re.sub(r"^```json\s*", "", cleaned_text)
    cleaned_text = re.sub(r"^```\s*", "", cleaned_text)
    cleaned_text = re.sub(r"\s*```$", "", cleaned_text)

    try:
        data = json.loads(cleaned_text)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="AI response could not be parsed",
        )

    return {
        "strengths": data.get("strengths", []),
        "weaknesses": data.get("weaknesses", []),
        "missing_skills": data.get("missing_skills", []),
        "suggestions": data.get("suggestions", []),
        "ats_tips": data.get("ats_tips", []),
    }


def analyze_resume_with_gemini(resume_text: str) -> dict:
    if not settings.GEMINI_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Gemini API key is not configured",
        )

    client = genai.Client(api_key=settings.GEMINI_API_KEY)
    prompt = build_resume_prompt(resume_text)

    try:
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt,
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Gemini API request failed",
        )

    if not response.text:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Gemini returned an empty response",
        )

    return parse_gemini_json(response.text)

