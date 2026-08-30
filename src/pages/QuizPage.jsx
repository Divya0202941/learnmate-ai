import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLearning } from '../context/LearningContext';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  Sparkles, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizPage = () => {
  const navigate = useNavigate();
  const { 
    activeQuizQuestions, 
    assessmentConfig, 
    submitQuizAnswers, 
    isEvaluating,
    prepareQuizSession
  } = useLearning();

  // If page reloaded without active session, fallback init
  useEffect(() => {
    if (!activeQuizQuestions || activeQuizQuestions.length === 0) {
      prepareQuizSession('python', 'Functions & Scope', 'Medium');
    }
  }, []);

  const questions = (activeQuizQuestions && activeQuizQuestions.length > 0)
    ? activeQuizQuestions
    : [
        {
          id: 101,
          question: 'What is the output of the following Python code?',
          code: `def calc(a, b=5):\n    return a * b\n\nprint(calc(3))`,
          options: ['8', '15', 'TypeError: b is missing', 'None'],
          correctAnswer: 1,
          explanation: 'Default argument b=5 is used, calc(3) computes 3 * 5 = 15.'
        }
      ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer

  const currentQ = questions[currentIndex] || questions[0];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectOption = (optIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    await submitQuizAnswers(selectedAnswers);
    navigate('/assessment/result');
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      
      {/* Quiz Header Bar */}
      <header className="bg-slate-950/90 border-b border-slate-800/80 px-6 py-4 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          
          <button
            onClick={() => navigate('/assessment')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Exit Quiz
          </button>

          <div className="text-center">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              {assessmentConfig.subjectId.toUpperCase()} • {assessmentConfig.topicName}
            </span>
            <h1 className="text-sm font-semibold text-slate-200">Diagnostic Assessment</h1>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400 font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(timeLeft)}</span>
          </div>

        </div>
      </header>

      {/* Main Quiz Content */}
      <main className="max-w-3xl w-full mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
        
        {/* Progress header */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-400">Question <span className="text-white">{currentIndex + 1}</span> of {questions.length}</span>
            <span className="text-cyan-400">{answeredCount} of {questions.length} Answered</span>
          </div>
          <ProgressBar progress={progressPercent} color="cyan" size="sm" />
        </div>

        {/* Question Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl space-y-6">
          
          {/* Question Text */}
          <div>
            <span className="text-xs font-bold uppercase text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
              Multiple Choice
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-3 leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Code block if any */}
          {currentQ.code && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto leading-relaxed shadow-inner">
              <pre>{currentQ.code}</pre>
            </div>
          )}

          {/* Options list */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((optionText, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;

              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/40'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center border ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span className="text-xs sm:text-sm font-medium">{optionText}</span>
                  </div>

                  {isSelected && <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />}
                </div>
              );
            })}
          </div>

        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            iconPosition="left"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>

          {currentIndex < questions.length - 1 ? (
            <Button
              variant="primary"
              size="md"
              icon={ArrowRight}
              onClick={handleNext}
            >
              Next Question
            </Button>
          ) : (
            <Button
              variant="gradient"
              size="md"
              icon={isEvaluating ? Loader2 : Sparkles}
              onClick={handleSubmit}
              disabled={isEvaluating}
              className="px-6 py-2.5 shadow-xl shadow-cyan-500/25"
            >
              {isEvaluating ? 'Evaluating Answers...' : 'Submit Assessment'}
            </Button>
          )}
        </div>

      </main>

      {/* Footer hint */}
      <footer className="py-4 border-t border-slate-900 text-center text-xs text-slate-500">
        LearnMate AI Assessment • Answers evaluated in real-time
      </footer>

    </div>
  );
};
