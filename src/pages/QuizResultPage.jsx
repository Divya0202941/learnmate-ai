import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLearning } from '../context/LearningContext';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  TrendingUp,
  Brain
} from 'lucide-react';

export const QuizResultPage = () => {
  const navigate = useNavigate();
  const { latestResult, assessmentConfig } = useLearning();

  const result = latestResult || {
    score: 7,
    totalQuestions: 10,
    accuracyPercent: 70,
    knowledgeLevel: 'Intermediate',
    strengths: ['Variables & Scoping', 'Control Flow Logic'],
    weakAreas: ['Functions & Closures', 'Recursion Base Cases'],
    aiAnalysisSummary: 'Your understanding of fundamentals is good, but you should strengthen Functions and Recursion before moving to advanced topics.',
    recommendedNextStep: 'Proceed to Personalized Learning Roadmap'
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header title="AI Assessment Analysis" subtitle="Detailed evaluation of your knowledge level and topic mastery" />

        <main className="p-6 lg:p-8 max-w-5xl w-full mx-auto space-y-8">
          
          {/* Main Score Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl glow-cyan">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> AI Diagnostic Complete
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Your Diagnostic Results
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              Subject: <span className="text-cyan-400 font-semibold">{assessmentConfig?.subjectId?.toUpperCase() || 'PYTHON'}</span> — {assessmentConfig?.topicName || 'Functions & Scope'}
            </p>

            {/* Score Ring / Gauge */}
            <div className="mt-8 mb-6 flex flex-col items-center justify-center">
              <div className="w-36 h-36 rounded-full bg-slate-900 border-4 border-cyan-500/40 flex flex-col items-center justify-center shadow-xl shadow-cyan-500/20 relative">
                <span className="text-4xl font-extrabold text-white">{result.score}/{result.totalQuestions}</span>
                <span className="text-xs text-cyan-400 font-bold mt-0.5">{result.accuracyPercent}% Accuracy</span>
              </div>
              
              <div className="mt-4">
                <Badge variant="cyan" size="lg">
                  Knowledge Level: <strong className="ml-1 text-white">{result.knowledgeLevel}</strong>
                </Badge>
              </div>
            </div>

          </div>

          {/* Breakdown Grid: Strengths vs Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30 bg-slate-900/60">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Demonstrated Strengths</h3>
              </div>

              <div className="space-y-3">
                {result.strengths.map((str, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                    <span className="text-emerald-400 font-bold">✅</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200">{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Needs Improvement */}
            <div className="p-6 rounded-2xl glass-panel border border-amber-500/30 bg-slate-900/60">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Needs Improvement</h3>
              </div>

              <div className="space-y-3">
                {result.weakAreas.map((weak, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                    <span className="text-amber-400 font-bold">⚠️</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200">{weak}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* AI Recommendation Summary Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-cyan-400 p-0.5 shrink-0 shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Brain className="w-6 h-6 text-cyan-400" />
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI Recommendation
                </span>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl leading-relaxed">
                  "{result.aiAnalysisSummary}"
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto flex flex-col sm:flex-row gap-3">
              <Button
                variant="secondary"
                size="md"
                icon={RotateCcw}
                onClick={() => navigate('/assessment')}
              >
                Retake Assessment
              </Button>

              <Button
                variant="gradient"
                size="md"
                icon={ArrowRight}
                onClick={() => navigate('/roadmap')}
                className="shadow-purple-500/20"
              >
                Generate My Learning Path →
              </Button>
            </div>

          </div>

        </main>
      </div>

    </div>
  );
};
