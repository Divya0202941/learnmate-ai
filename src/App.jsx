import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LearningProvider } from './context/LearningContext';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { QuizPage } from './pages/QuizPage';
import { QuizResultPage } from './pages/QuizResultPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { DoubtSolverPage } from './pages/DoubtSolverPage';
import { QuizGeneratorPage } from './pages/QuizGeneratorPage';
import { PerformancePage } from './pages/PerformancePage';
import { ProfilePage } from './pages/ProfilePage';

export default function App() {
  return (
    <LearningProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/assessment/quiz" element={<QuizPage />} />
          <Route path="/assessment/result" element={<QuizResultPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/doubt-solver" element={<DoubtSolverPage />} />
          <Route path="/quiz" element={<QuizGeneratorPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </LearningProvider>
  );
}
