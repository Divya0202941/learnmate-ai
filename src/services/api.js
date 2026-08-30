const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const apiService = {
  /**
   * Solves a student doubt via FastAPI backend + Gemini API
   */
  async solveDoubt(question, subject = 'General', topic = 'General') {
    try {
      const response = await fetch(`${API_BASE_URL}/api/doubt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          subject,
          topic
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      return {
        answer: data.answer || '',
        example: data.example || '',
        practiceQuestion: data.practice_question || ''
      };
    } catch (err) {
      console.error('API Error in solveDoubt:', err);
      return {
        answer: `Unable to connect to FastAPI backend server (${err.message}). Make sure your FastAPI server is running on http://localhost:8000.`,
        example: 'python -m uvicorn backend.main:app --reload --port 8000',
        practiceQuestion: 'Is your backend server running?'
      };
    }
  },

  /**
   * Generates a custom quiz using Gemini AI via FastAPI backend
   */
  async generateQuiz(subject, topic, difficulty = 'Intermediate', count = 5) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          topic,
          difficulty,
          count: Number(count)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      return {
        subject: data.subject,
        topic: data.topic,
        difficulty: data.difficulty,
        questions: data.questions.map((q, idx) => ({
          id: q.id || idx + 1,
          question: q.question,
          options: q.options,
          correctAnswer: q.correct_answer,
          explanation: q.explanation
        }))
      };
    } catch (err) {
      console.error('API Error in generateQuiz:', err);
      throw err;
    }
  }
};
