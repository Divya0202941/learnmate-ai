import React, { createContext, useContext, useState } from 'react';
import { INITIAL_STUDENT_PROFILE } from '../data/student';
import { SUBJECTS } from '../data/subjects';
import { MOCK_QUESTIONS } from '../data/questions';
import { aiService } from '../services/aiService';

const LearningContext = createContext();

export const LearningProvider = ({ children }) => {
  const [student, setStudent] = useState(INITIAL_STUDENT_PROFILE);
  const [subjects, setSubjects] = useState(SUBJECTS);

  // Active Assessment State
  const [assessmentConfig, setAssessmentConfig] = useState({
    subjectId: 'python',
    topicName: 'Functions & Scope',
    difficulty: 'Medium',
    questionCount: 5
  });

  const [activeQuizQuestions, setActiveQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [latestResult, setLatestResult] = useState(null);
  const [currentRoadmap, setCurrentRoadmap] = useState(null);

  // Initialize Quiz Session
  const prepareQuizSession = (subjectId, topicName, difficulty = 'Medium') => {
    const subjQuestions = MOCK_QUESTIONS[subjectId] || {};
    const topicQs = subjQuestions[topicName] || MOCK_QUESTIONS['python']['Functions & Scope'];

    setAssessmentConfig({
      subjectId,
      topicName,
      difficulty,
      questionCount: topicQs.length
    });

    setActiveQuizQuestions(topicQs);
    setUserAnswers({});
  };

  // Submit Quiz & Trigger AI Analysis
  const submitQuizAnswers = async (answersMap) => {
    setIsEvaluating(true);
    let correctCount = 0;

    activeQuizQuestions.forEach((q, idx) => {
      if (answersMap[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const currentSubjectObj = subjects.find(s => s.id === assessmentConfig.subjectId) || subjects[0];

    const quizData = {
      subject: currentSubjectObj.name,
      topic: assessmentConfig.topicName,
      totalQuestions: activeQuizQuestions.length,
      score: correctCount,
      answers: answersMap
    };

    const aiResult = await aiService.analyzeStudent(quizData);
    setLatestResult(aiResult);

    // Update student progress statistics state
    const newAccuracy = Math.round((student.quizAccuracyPercent * 4 + aiResult.accuracyPercent) / 5);
    setStudent(prev => ({
      ...prev,
      overallProgress: Math.min(100, prev.overallProgress + (aiResult.score > 2 ? 2 : 0)),
      quizAccuracyPercent: newAccuracy,
      topicsCompleted: prev.topicsCompleted + (aiResult.accuracyPercent >= 70 ? 1 : 0)
    }));

    // Auto-generate initial roadmap for result screen
    const roadmap = await aiService.generateLearningPath(currentSubjectObj.name, assessmentConfig.topicName);
    setCurrentRoadmap(roadmap);

    setIsEvaluating(false);
    return aiResult;
  };

  // Quick Action to update Weak Area
  const focusOnWeakArea = (subjectName, topicName) => {
    const foundSubj = subjects.find(s => s.name.toLowerCase() === subjectName.toLowerCase()) || subjects[0];
    prepareQuizSession(foundSubj.id, topicName, 'Medium');
  };

  return (
    <LearningContext.Provider
      value={{
        student,
        setStudent,
        subjects,
        assessmentConfig,
        setAssessmentConfig,
        activeQuizQuestions,
        userAnswers,
        setUserAnswers,
        isEvaluating,
        latestResult,
        currentRoadmap,
        setCurrentRoadmap,
        prepareQuizSession,
        submitQuizAnswers,
        focusOnWeakArea
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
