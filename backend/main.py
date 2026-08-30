import os
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

import sys

# Load environment variables from backend/.env
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.append(str(backend_dir))

from services.ai_service import get_gemini_response, generate_quiz_ai

app = FastAPI(
    title="LearnMate AI Backend",
    description="FastAPI REST service powering LearnMate AI educational features",
    version="1.0.0"
)

# CORS configuration for production (Vercel) and local dev
allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "")
origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]

default_origins = [
    "https://learnmate-ai-pi.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

for o in default_origins:
    if o not in origins:
        origins.append(o)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DoubtRequest(BaseModel):
    question: str = Field(..., description="Student question or prompt")
    subject: str = Field(default="General", description="Current subject context")
    topic: str = Field(default="General", description="Current topic context")

class DoubtResponse(BaseModel):
    answer: str
    example: str = ""
    practice_question: str = ""

class QuizGenerateRequest(BaseModel):
    subject: str = Field(default="Python", description="Target subject")
    topic: str = Field(default="Recursion", description="Target topic")
    difficulty: str = Field(default="Intermediate", description="Beginner, Intermediate, or Advanced")
    count: int = Field(default=5, description="Number of questions (5 or 10)")

class QuizItem(BaseModel):
    id: int
    question: str
    options: list[str]
    correct_answer: int
    explanation: str

class QuizGenerateResponse(BaseModel):
    subject: str
    topic: str
    difficulty: str
    questions: list[QuizItem]

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "LearnMate AI FastAPI"}

@app.post("/api/doubt", response_model=DoubtResponse)
def solve_doubt(req: DoubtRequest):
    if not req.question or not req.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty.")
    
    result = get_gemini_response(
        question=req.question,
        subject=req.subject,
        topic=req.topic
    )
    return result

@app.post("/api/generate-quiz", response_model=QuizGenerateResponse)
def create_quiz(req: QuizGenerateRequest):
    try:
        result = generate_quiz_ai(
            subject=req.subject,
            topic=req.topic,
            difficulty=req.difficulty,
            count=req.count
        )
        return result
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
