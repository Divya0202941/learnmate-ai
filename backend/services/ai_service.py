import os
import json
import requests
from google import genai
from google.genai import types
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parent.parent / ".env"

def _call_groq(prompt: str, system_instruction: str, api_key: str) -> str:
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key.strip()}",
        "Content-Type": "application/json"
    }
    models = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "llama3-70b-8192", "mixtral-8x7b-32768"]
    last_err = None

    for m in models:
        for fmt in [{"type": "json_object"}, None]:
            try:
                payload = {
                    "model": m,
                    "messages": [
                        {"role": "system", "content": system_instruction},
                        {"role": "user", "content": prompt}
                    ],
                    "temperature": 0.7
                }
                if fmt:
                    payload["response_format"] = fmt
                response = requests.post(url, headers=headers, json=payload, timeout=25)
                response.raise_for_status()
                data = response.json()
                return data["choices"][0]["message"]["content"]
            except Exception as e:
                last_err = e
                continue

    raise last_err or Exception("Failed to receive response from Groq models.")


def get_gemini_response(question: str, subject: str = "General", topic: str = "General") -> dict:
    load_dotenv(dotenv_path=env_path, override=False)
    groq_key = os.getenv("GROQ_API_KEY")
    gemini_key = os.getenv("GEMINI_API_KEY")

    api_key = groq_key or gemini_key

    if not api_key or api_key.strip() == "" or api_key in ["your_api_key_here", "YOUR_API_KEY_HERE"]:
        return {
            "answer": "⚠️ API key is not configured yet. Please add GROQ_API_KEY (starts with gsk_...) or GEMINI_API_KEY to your environment settings.",
            "example": "GROQ_API_KEY=gsk_...",
            "practice_question": "Have you created a free Groq API key at console.groq.com?"
        }

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

    raw_text = None

    # Check if key is a Groq key (starts with gsk_)
    if api_key.startswith("gsk_"):
        try:
            raw_text = _call_groq(prompt, system_instruction, api_key)
        except Exception as err:
            return {
                "answer": f"Groq AI Error: {str(err)}",
                "example": "",
                "practice_question": ""
            }
    else:
        # Use Google Gemini SDK
        try:
            client = genai.Client(api_key=api_key)
            models_to_try = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"]
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
        except Exception as err:
            return {
                "answer": f"API Error: {str(err)}",
                "example": "",
                "practice_question": ""
            }

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


def generate_quiz_ai(subject: str, topic: str, difficulty: str = "Intermediate", count: int = 5) -> dict:
    load_dotenv(dotenv_path=env_path, override=False)
    groq_key = os.getenv("GROQ_API_KEY")
    gemini_key = os.getenv("GEMINI_API_KEY")

    api_key = groq_key or gemini_key

    if not api_key or api_key.strip() == "" or api_key in ["your_api_key_here", "YOUR_API_KEY_HERE"]:
        raise ValueError("AI API Key (GROQ_API_KEY or GEMINI_API_KEY) is missing or set to placeholder")

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

    raw_text = None

    if api_key.startswith("gsk_"):
        raw_text = _call_groq(prompt, system_instruction, api_key)
    else:
        client = genai.Client(api_key=api_key)
        models_to_try = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"]
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
