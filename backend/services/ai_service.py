import os
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parent.parent / ".env"

def get_gemini_response(question: str, subject: str = "General", topic: str = "General") -> dict:
    load_dotenv(dotenv_path=env_path, override=True)
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key or api_key.strip() == "" or api_key in ["your_api_key_here", "YOUR_API_KEY_HERE"]:
        return {
            "answer": "⚠️ GEMINI_API_KEY is not configured yet. Please open `backend/.env` and replace `YOUR_API_KEY_HERE` with your actual Gemini API key.",
            "example": "# backend/.env\nGEMINI_API_KEY=AIzaSy...",
            "practice_question": "Have you pasted your real GEMINI_API_KEY into backend/.env?"
        }

    try:
        client = genai.Client(api_key=api_key)

        system_instruction = (
            "You are LearnMate AI, a friendly and patient educational tutor.\n\n"
            "Explain concepts according to the student's level.\n"
            "Use simple language.\n"
            "Give step-by-step explanations when appropriate.\n"
            "Use examples related to the selected subject.\n"
            "Do not simply provide answers when the student is asking an academic question; help them understand the concept.\n"
            "End with a short practice question whenever appropriate.\n\n"
            "If the student asks something unrelated to education, politely redirect them toward learning-related questions.\n\n"
            "Return output strictly in JSON format with three fields: 'answer', 'example', and 'practice_question'."
        )

        prompt = (
            f"Subject: {subject}\n"
            f"Topic: {topic}\n"
            f"Student Question: {question}\n\n"
            "Provide an educational explanation, a code/practical example, and a short follow-up practice question."
        )

        # Primary Gemini model
        models_to_try = ["gemini-3.6-flash", "gemini-3.5-flash", "gemini-2.5-flash"]
        raw_text = None
        last_error = None

        for m_name in models_to_try:
            try:
                response = client.models.generate_content(
                    model=m_name,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        system_instruction=system_instruction,
                        response_mime_type="application/json",
                        temperature=0.7,
                    ),
                )
                raw_text = response.text
                if raw_text:
                    break
            except Exception as e:
                last_error = e
                continue

        if not raw_text:
            raise last_error or Exception("Failed to receive content from Gemini models.")

        try:
            parsed = json.loads(raw_text, strict=False)
        except Exception:
            cleaned = raw_text.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:]
            if cleaned.startswith("```"):
                cleaned = cleaned[3:]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
            try:
                parsed = json.loads(cleaned.strip(), strict=False)
            except Exception:
                parsed = {"answer": raw_text, "example": "", "practice_question": ""}

        return {
            "answer": parsed.get("answer", raw_text),
            "example": parsed.get("example", ""),
            "practice_question": parsed.get("practice_question", "")
        }

    except Exception as err:
        return {
            "answer": f"API Error: {str(err)}",
            "example": "",
            "practice_question": ""
        }


def generate_quiz_ai(subject: str, topic: str, difficulty: str = "Intermediate", count: int = 5) -> dict:
    load_dotenv(dotenv_path=env_path, override=True)
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key or api_key.strip() == "" or api_key in ["your_api_key_here", "YOUR_API_KEY_HERE"]:
        raise ValueError("GEMINI_API_KEY is missing or set to placeholder in backend/.env")

    client = genai.Client(api_key=api_key)

    system_instruction = (
        "You are LearnMate AI, an expert educational assessment author.\n"
        f"Generate exactly {count} distinct multiple-choice questions for subject '{subject}', topic '{topic}', at '{difficulty}' level.\n"
        "Each question object MUST have:\n"
        "- 'id': integer starting from 1\n"
        "- 'question': string question text\n"
        "- 'options': list of exactly 4 distinct choices [string, string, string, string]\n"
        "- 'correct_answer': integer index (0, 1, 2, or 3)\n"
        "- 'explanation': concise pedagogical explanation of the correct answer\n\n"
        "Return output strictly in valid JSON format matching: { \"questions\": [...] }"
    )

    prompt = f"Subject: {subject}\nTopic: {topic}\nDifficulty: {difficulty}\nQuestion Count: {count}"

    models_to_try = ["gemini-3.6-flash", "gemini-3.5-flash", "gemini-2.5-flash"]
    raw_text = None
    last_error = None

    for m_name in models_to_try:
        try:
            response = client.models.generate_content(
                model=m_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    response_mime_type="application/json",
                    temperature=0.7,
                ),
            )
            raw_text = response.text
            if raw_text:
                break
        except Exception as e:
            last_error = e
            continue

    if not raw_text:
        raise last_error or Exception("Failed to receive response from Gemini model.")

    try:
        parsed = json.loads(raw_text, strict=False)
    except Exception:
        cleaned = raw_text.strip()
        if cleaned.startswith("```json"):
            cleaned = cleaned[7:]
        if cleaned.startswith("```"):
            cleaned = cleaned[3:]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
        parsed = json.loads(cleaned.strip(), strict=False)

    questions = parsed.get("questions", [])
    return {
        "subject": subject,
        "topic": topic,
        "difficulty": difficulty,
        "questions": questions
    }

