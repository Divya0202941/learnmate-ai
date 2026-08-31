import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { Badge } from '../components/common/Badge';
import { apiService } from '../services/api';
import { useLearning } from '../context/LearningContext';
import { 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Loader2, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  LayoutDashboard,
  Brain,
  Award,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizGeneratorPage = () => {
  const navigate = useNavigate();
  const { subjects } = useLearning();

  // Phase: 'setup' | 'quiz' | 'result'
  const [phase, setPhase] = useState('setup');

  // Form State
  const [subject, setSubject] = useState('Python');
  const [topic, setTopic] = useState('Recursion');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [count, setCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Active Quiz State
  const [quizData, setQuizData] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  // Trigger AI Quiz Generation
  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const data = await apiService.generateQuiz(subject, topic, difficulty, count);
      if (!data.questions || data.questions.length === 0) {
        throw new Error('No questions returned from Gemini AI engine.');
      }
      setQuizData(data);
      setCurrentIdx(0);
      setUserAnswers({});
      setPhase('quiz');
    } catch (err) {
      console.error(err);
      setErrorMsg(`Failed to generate AI quiz: ${err.message}. Please check if backend is running on http://localhost:8000 and GEMINI_API_KEY is configured.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectOption = (qId, optionIdx) => {
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentIdx < quizData.questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
    setPhase('result');
  };

  const handlePracticeAgain = () => {
    handleGenerate();
  };

  // Calculate results if in result phase
  let score = 0;
  let accuracy = 0;
  let incorrectQuestions = [];

  if (quizData && phase === 'result') {
    quizData.questions.forEach((q) => {
      const uAns = userAnswers[q.id];
      if (uAns === q.correctAnswer) {
        score += 1;
      } else {
        incorrectQuestions.push(q);
      }
    });
    accuracy = Math.round((score / quizData.questions.length) * 100);
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header title="AI Quiz Generator 📝" subtitle="Synthesize dynamic practice tests powered by AI" />

        <main className="p-6 lg:p-8 max-w-5xl w-full mx-auto space-y-8">
          
          {/* ERROR ALERT */}
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3 shadow-lg">
              <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
              <div>
                <strong className="font-bold">Error:</strong> {errorMsg}
              </div>
            </div>
          )}

          {/* ==================== PHASE 1: SETUP FORM ==================== */}
          {phase === 'setup' && (
            <div className="space-y-8">
              
              {/* Header Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 relative overflow-hidden shadow-2xl glow-purple">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Generative AI Assessment Engine</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Generate Your Custom AI Quiz
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  Select your subject, topic, difficulty level, and number of questions. Gemini AI will author brand-new questions on demand.
                </p>
              </div>

              {/* Form Card */}
              <form onSubmit={handleGenerate} className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-6 shadow-xl">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Subject Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Target Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        const subjObj = subjects.find(s => s.name === e.target.value);
                        if (subjObj && subjObj.topics.length > 0) {
                          setTopic(subjObj.topics[0].name);
                        }
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                    >
                      {subjects.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Topic Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Target Topic</label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g. Recursion, Normalization, BST"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>

                  {/* Difficulty Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Difficulty Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Beginner', 'Intermediate', 'Advanced'].map(diff => (
                        <button
                          key={diff}
                          type="button"
                          onClick={() => setDifficulty(diff)}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                            difficulty === diff
                              ? 'bg-purple-500 text-white border-purple-400 shadow-md shadow-purple-500/20'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Number of Questions */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Number of Questions</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[5, 10].map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setCount(n)}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                            count === n
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {n} Questions
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Generate CTA Button */}
                <div className="pt-4 border-t border-slate-800">
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    icon={isGenerating ? Loader2 : Sparkles}
                    disabled={isGenerating}
                    fullWidth
                    className="py-3.5 text-base shadow-xl shadow-purple-500/25"
                  >
                    {isGenerating ? 'LearnMate AI is generating your personalized quiz...' : 'Generate Quiz with AI →'}
                  </Button>
                </div>

              </form>

            </div>
          )}

          {/* ==================== PHASE 2: ACTIVE QUIZ RUNNER ==================== */}
          {phase === 'quiz' && quizData && (
            <div className="space-y-6">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                    {quizData.subject} • {quizData.topic} ({quizData.difficulty})
                  </span>
                  <h2 className="text-sm font-semibold text-slate-200">
                    Question {currentIdx + 1} of {quizData.questions.length}
                  </h2>
                </div>

                <Badge variant="purple" size="md">AI Generated ✨</Badge>
              </div>

              {/* Progress Bar */}
              <ProgressBar
                progress={Math.round(((currentIdx + 1) / quizData.questions.length) * 100)}
                color="purple"
                size="sm"
              />

              {/* Current Question Card */}
              {(() => {
                const q = quizData.questions[currentIdx];
                const selectedOpt = userAnswers[q.id];

                return (
                  <div className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-6 shadow-2xl">
                    
                    <div>
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        Question #{currentIdx + 1}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed mt-2">
                        {q.question}
                      </h3>
                    </div>

                    {/* Options list */}
                    <div className="space-y-3 pt-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                              isSelected
                                ? 'bg-purple-500/15 border-purple-500 text-white shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/40'
                                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-3.5">
                              <div className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center border ${
                                isSelected
                                  ? 'bg-purple-500 text-white border-purple-400'
                                  : 'bg-slate-800 text-slate-400 border-slate-700'
                              }`}>
                                {String.fromCharCode(65 + optIdx)}
                              </div>
                              <span className="text-xs sm:text-sm font-medium">{opt}</span>
                            </div>

                            {isSelected && <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>

                  </div>
                );
              })()}

              {/* Question Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="secondary"
                  size="md"
                  icon={ArrowLeft}
                  iconPosition="left"
                  onClick={handlePrev}
                  disabled={currentIdx === 0}
                >
                  Previous
                </Button>

                {currentIdx < quizData.questions.length - 1 ? (
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
                    icon={Sparkles}
                    onClick={handleSubmitQuiz}
                    className="shadow-purple-500/25 px-6"
                  >
                    Submit Quiz
                  </Button>
                )}
              </div>

            </div>
          )}

          {/* ==================== PHASE 3: RESULTS & AI WEAKNESS ANALYSIS ==================== */}
          {phase === 'result' && quizData && (
            <div className="space-y-8">
              
              {/* Score Gauge Banner */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 text-center relative overflow-hidden shadow-2xl glow-purple">
                <Badge variant="purple" size="md" className="mb-3">Quiz Results</Badge>
                
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                  Performance Evaluation
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Subject: <span className="text-purple-400 font-bold">{quizData.subject}</span> — {quizData.topic} ({quizData.difficulty})
                </p>

                <div className="mt-8 mb-6 flex flex-col items-center justify-center">
                  <div className="w-36 h-36 rounded-full bg-slate-900 border-4 border-purple-500/50 flex flex-col items-center justify-center shadow-xl shadow-purple-500/20">
                    <span className="text-4xl font-extrabold text-white">{score}/{quizData.questions.length}</span>
                    <span className="text-xs text-purple-400 font-bold mt-0.5">{accuracy}% Accuracy</span>
                  </div>
                </div>

                <p className="text-sm font-semibold text-slate-200 max-w-lg mx-auto">
                  {accuracy >= 80
                    ? "🎉 Outstanding performance! You have mastered this concept."
                    : accuracy >= 50
                    ? "👍 Solid effort! Review the missed concepts below to reach 100%."
                    : "⚠️ Good practice session! Dedicated review of the weak areas below will boost your mastery."}
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Button
                    variant="gradient"
                    size="md"
                    icon={RotateCcw}
                    onClick={handlePracticeAgain}
                    disabled={isGenerating}
                  >
                    Practice Again
                  </Button>

                  <Button
                    variant="secondary"
                    size="md"
                    icon={LayoutDashboard}
                    onClick={() => navigate('/dashboard')}
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </div>

              {/* AI "What to Improve" Section */}
              <div className="p-6 rounded-3xl glass-panel border border-amber-500/30 bg-slate-900/70 space-y-3 shadow-xl">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Brain className="w-5 h-5 text-amber-400" /> AI Weakness Analysis — "What to Improve"
                </div>

                {incorrectQuestions.length > 0 ? (
                  <div className="text-xs text-slate-300 leading-relaxed space-y-2">
                    <p>
                      Based on your quiz submission, you missed <strong className="text-rose-400">{incorrectQuestions.length}</strong> question{incorrectQuestions.length > 1 ? 's' : ''}:
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 text-slate-300 font-medium pl-2">
                      {incorrectQuestions.map((q, idx) => (
                        <li key={idx}>
                          <span className="font-bold text-white">{q.question}</span>
                          <span className="block text-slate-400 text-[11px] ml-5">💡 Recommendation: {q.explanation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-xs text-emerald-300 font-semibold">
                    ✅ Zero incorrect answers! You answered every question correctly in this session.
                  </p>
                )}
              </div>

              {/* Questions Detailed Breakdown */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-white">Full Questions Breakdown</h2>

                {quizData.questions.map((q, idx) => {
                  const uAns = userAnswers[q.id];
                  const isCorrect = uAns === q.correctAnswer;

                  return (
                    <div
                      key={q.id || idx}
                      className={`p-6 rounded-2xl glass-panel border ${
                        isCorrect ? 'border-emerald-500/30' : 'border-rose-500/30'
                      } space-y-4`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Question {idx + 1}</span>
                        {isCorrect ? (
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                            Correct ✅
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                            Incorrect ❌
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">{q.question}</h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt, oIdx) => {
                          const isUserPick = uAns === oIdx;
                          const isRightChoice = q.correctAnswer === oIdx;

                          let style = 'bg-slate-900 border-slate-800 text-slate-400';
                          if (isRightChoice) {
                            style = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-bold';
                          } else if (isUserPick && !isRightChoice) {
                            style = 'bg-rose-500/15 border-rose-500/50 text-rose-300 font-bold';
                          }

                          return (
                            <div key={oIdx} className={`p-3 rounded-xl border text-xs ${style}`}>
                              {String.fromCharCode(65 + oIdx)}. {opt}
                              {isRightChoice && ' ✅'}
                              {isUserPick && !isRightChoice && ' ❌ (Your Answer)'}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                        💡 <strong className="text-slate-200">Explanation:</strong> {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
};
