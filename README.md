# LearnMate AI

> **"Learn Smarter. Learn Your Way."**

LearnMate AI is an AI-powered personalized learning platform for the hackathon theme **"AI with Education."** It helps students learn according to their individual knowledge level, learning speed, strengths, weaknesses, and performance.

The platform follows a continuous 7-step learning cycle:
**Assess → Analyze → Personalize → Learn → Practice → Evaluate → Recommend**

---

## 🎯 Problem Statement
Traditional education systems deliver uniform learning content to all students regardless of their individual knowledge gaps, learning pace, and existing strengths. As a result, students either waste time re-learning familiar concepts or struggle silently with unaddressed foundational weak spots.

## 💡 Solution
LearnMate AI introduces a dynamic diagnostic engine and AI-driven personalization loop. It assesses student baseline understanding, pinpoints exact weak topics (e.g., DBMS Normalization or Python Recursion), and automatically constructs a personalized visual learning roadmap with targeted practice and 24/7 AI doubt solving.

---

## ✨ Key Features

- 🧠 **Personalized Learning Roadmap**: Interactive visual roadmap adjusting learning nodes (Completed, Recommended, Locked) dynamically based on diagnostic results.
- 🤖 **AI Doubt Solver**: Conversational AI tutor interface for step-by-step code explanation, structural diagrams, and concept breakdowns.
- 📝 **Smart Diagnostic & AI Quiz Generator**: Adaptive testing suite calculating real-time accuracy and generating custom practice quizzes.
- 📊 **Performance Analytics**: Subject-wise accuracy breakdown, learning velocity tracking, 7-day streak counters, and weekly activity charts.
- 🎯 **Smart AI Recommendations**: Context-aware prompts pointing students to their highest-leverage study topic.
- 👤 **Student Workspace**: Comprehensive profile and settings for target weekly study hours and notification preferences.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** & **Vite 6**
- **JavaScript (ES6+)**
- **Tailwind CSS v4** + `@tailwindcss/vite`
- **React Router v7**
- **Lucide React Icons**
- **Canvas Confetti** (Celebratory UI interactions)

### Backend (Architecture Ready)
- **Python FastAPI** REST APIs (Ready for integration)

### AI Engine (Modular Service)
- **Google Gemini API** (`@google/genai`) / **OpenAI API**
- Pre-built service layer in `src/services/aiService.js`

### Database Architecture
- **PostgreSQL** / **Firebase Firestore**

---

## 🏗️ System Architecture

```text
Student → Frontend (React + Vite) → REST API (FastAPI) → AI Engine (Gemini / OpenAI) → Database → Personalized Recommendation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ and npm

### Installation & Run

1. Clone or navigate to the project directory:
   ```bash
   cd learnmate-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## 🔮 Future Scope & Roadmap

- 🎙️ **Voice-Based AI Tutor**: Interactive speech-to-text tutoring for verbal explanation.
- 🌐 **Multilingual Education Support**: Real-time translation of technical roadmaps and explanations.
- 📄 **PDF & Lecture Document Scanner**: Auto-generate quizzes and flashcards directly from course slides.
- 👨‍🏫 **Teacher & Classroom Dashboard**: Instructor view for monitoring class-wide weak areas.
- ⚡ **Adaptive Dynamic Difficulty**: Real-time question difficulty scaling during active tests.
- 📱 **Offline PWA Learning Mode**: Cached learning roadmaps and practice questions.
