from pydantic import BaseModel


class ResumeAnalysisResponse(BaseModel):
    strengths: list[str]
    weaknesses: list[str]
    missing_skills: list[str]
    suggestions: list[str]
    ats_tips: list[str]

