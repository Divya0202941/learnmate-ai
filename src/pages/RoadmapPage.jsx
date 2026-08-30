import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLearning } from '../context/LearningContext';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  BookOpen, 
  Zap,
  Target
} from 'lucide-react';

export const RoadmapPage = () => {
  const navigate = useNavigate();
  const { currentRoadmap, prepareQuizSession, assessmentConfig } = useLearning();

  const roadmapData = currentRoadmap || {
    subject: assessmentConfig?.subjectId ? assessmentConfig.subjectId.toUpperCase() : 'PYTHON',
    targetTopic: assessmentConfig?.topicName || 'Functions & Scope',
    steps: [
      { id: '1', title: 'Variables & Data Types', status: 'completed', description: 'Basic variable definitions and primitive data types.' },
      { id: '2', title: 'Conditions & Control Flow', status: 'completed', description: 'If/else conditions and boolean evaluation.' },
      { id: '3', title: 'Loops & Iterations', status: 'completed', description: 'For loops, while loops, and list comprehensions.' },
      { id: '4', title: 'Functions & Scope', status: 'recommended', description: 'Parameters, return values, scope, and closures.', isHighlighted: true },
      { id: '5', title: 'Recursion Base Cases', status: 'locked', description: 'Recursive call stack and memoization.' },
      { id: '6', title: 'Object-Oriented Programming', status: 'locked', description: 'Classes, inheritance, and encapsulation.' }
    ],
    aiExplanation: 'Your assessment indicates that Functions is currently your weakest area.'
  };

  const handleStartNode = (step) => {
    prepareQuizSession('python', step.title, 'Medium');
    navigate('/assessment/quiz');
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Personalized Learning Roadmap" subtitle="AI-curated sequential learning path based on your diagnostic results" />

        <main className="p-6 lg:p-8 max-w-5xl w-full mx-auto space-y-8">
          
          {/* Top Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">AI Learning Journey</span>
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                {roadmapData.subject} Master Roadmap
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Follow this AI-optimized sequence to eliminate weak areas efficiently.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="emerald" size="md">3 Completed ✅</Badge>
              <Badge variant="amber" size="md">1 Recommended ⚠️</Badge>
              <Badge variant="outline" size="md">2 Locked 🔒</Badge>
            </div>
          </div>

          {/* AI Explanation "Why this topic?" Callout Box */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3.5 shadow-lg">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">Why this topic?</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-relaxed">
                "{roadmapData.aiExplanation}"
              </p>
            </div>
          </div>

          {/* Visual Roadmap Tree Flow */}
          <div className="relative py-4">
            
            {/* Connecting vertical line */}
            <div className="absolute left-6 sm:left-8 top-8 bottom-8 w-1 bg-slate-800/80 rounded-full z-0" />

            <div className="space-y-6 relative z-10">
              {roadmapData.steps.map((step, idx) => {
                const isCompleted = step.status === 'completed';
                const isRecommended = step.status === 'recommended' || step.isHighlighted;
                const isLocked = step.status === 'locked';

                return (
                  <div
                    key={step.id || idx}
                    className={`flex items-start gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl transition-all duration-300 ${
                      isRecommended
                        ? 'bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-2 border-cyan-500 shadow-xl shadow-cyan-500/15 scale-[1.01]'
                        : isCompleted
                        ? 'bg-slate-900/60 border border-slate-800'
                        : 'bg-slate-900/30 border border-slate-800/50 opacity-60'
                    }`}
                  >
                    
                    {/* Node Icon Circle */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 border shadow-lg ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : isRecommended
                        ? 'bg-cyan-500 text-slate-950 border-cyan-300 animate-pulse-glow'
                        : 'bg-slate-900 text-slate-600 border-slate-800'
                    }`}>
                      {isCompleted && <CheckCircle2 className="w-5 h-5" />}
                      {isRecommended && <Zap className="w-5 h-5 fill-slate-950" />}
                      {isLocked && <Lock className="w-4 h-4" />}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2.5 mb-1">
                          <h3 className={`text-base sm:text-lg font-bold ${isRecommended ? 'text-cyan-300' : 'text-white'}`}>
                            {step.title}
                          </h3>

                          {isCompleted && (
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                              Completed ✅
                            </span>
                          )}

                          {isRecommended && (
                            <span className="text-[10px] bg-cyan-500 text-slate-950 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-bounce">
                              Recommended Step ⚠️
                            </span>
                          )}

                          {isLocked && (
                            <span className="text-[10px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full font-semibold">
                              Locked 🔒
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-400">{step.description}</p>
                      </div>

                      {/* Node Action CTA */}
                      <div>
                        {isRecommended && (
                          <Button
                            variant="gradient"
                            size="md"
                            icon={ArrowRight}
                            onClick={() => handleStartNode(step)}
                            className="w-full sm:w-auto shadow-cyan-500/20"
                          >
                            Start Practice
                          </Button>
                        )}

                        {isCompleted && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStartNode(step)}
                          >
                            Review
                          </Button>
                        )}
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </main>
      </div>

    </div>
  );
};
