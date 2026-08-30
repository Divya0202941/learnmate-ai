import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { StatCard } from '../components/dashboard/StatCard';
import { ActivityChart } from '../components/dashboard/ActivityChart';
import { ProgressBar } from '../components/common/ProgressBar';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useLearning } from '../context/LearningContext';
import { 
  TrendingUp, 
  Flame, 
  CheckCircle2, 
  Award, 
  Brain, 
  Sparkles,
  BarChart2,
  AlertTriangle,
  Zap,
  HelpCircle,
  MessageSquare,
  Map,
  ArrowRight,
  Clock,
  BookOpen,
  ShieldCheck,
  Check
} from 'lucide-react';

export const PerformancePage = () => {
  const navigate = useNavigate();
  const { student, subjects, prepareQuizSession } = useLearning();

  const handleImproveTopic = (subjectName, topicName) => {
    const foundSubj = subjects.find(s => s.name.toLowerCase() === subjectName.toLowerCase()) || subjects[0];
    prepareQuizSession(foundSubj.id, topicName, 'Medium');
    navigate('/assessment');
  };

  const recentAttempts = [
    { id: 1, subject: 'Python', topic: 'Functions & Scope', score: '8/10', accuracy: 80, date: 'Today, 2:30 PM', status: 'Passed' },
    { id: 2, subject: 'DBMS', topic: 'Normalization (1NF to BCNF)', score: '4/10', accuracy: 40, date: 'Today, 11:15 AM', status: 'Needs Review' },
    { id: 3, subject: 'Data Structures', topic: 'Binary Search Trees', score: '9/10', accuracy: 90, date: 'Yesterday, 4:45 PM', status: 'Passed' },
    { id: 4, subject: 'Java', topic: 'Exception Handling', score: '6/10', accuracy: 60, date: '2 days ago', status: 'Passed' }
  ];

  const strongTopics = [
    { subject: 'Data Structures', topic: 'Binary Search Trees', score: 90, status: 'Mastered ✅' },
    { subject: 'Python', topic: 'Variables & Control Flow', score: 92, status: 'Mastered ✅' },
    { subject: 'Computer Networks', topic: 'OSI 7-Layer Model', score: 85, status: 'Mastered ✅' }
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Performance Analytics 📊" subtitle="Comprehensive AI evaluation of your learning velocity, topic accuracy, and mastery" />

        <main className="p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* Section 1: Hero Summary & Overall Score Gauge */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl glow-cyan">
            
            {/* Score Ring */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-8">
              <div className="w-36 h-36 rounded-full bg-slate-950 border-4 border-cyan-500/50 flex flex-col items-center justify-center shadow-xl shadow-cyan-500/20 relative">
                <span className="text-4xl font-extrabold text-white">{student.overallProgress}%</span>
                <span className="text-xs text-cyan-400 font-bold mt-0.5">Overall Accuracy</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="cyan" size="md">+14% Growth this week</Badge>
              </div>
            </div>

            {/* Overall Breakdown */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Personalized Mastery Summary</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Great momentum, {student.name.split(' ')[0]}!
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Your assessment accuracy is sitting strong at <strong className="text-cyan-400">{student.quizAccuracyPercent}%</strong> across 24 completed topics. Strengthening your 3 identified weak areas will push your overall core score above 85%.
              </p>

              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium">Assessment Score</span>
                  <div className="text-lg font-extrabold text-white">82%</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium">Quiz Score</span>
                  <div className="text-lg font-extrabold text-purple-400">76%</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium">Streak Counter</span>
                  <div className="text-lg font-extrabold text-amber-400">7 Days 🔥</div>
                </div>
              </div>
            </div>

          </div>

          {/* Section 2: Quick Action Bar (4 Interactive Buttons) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <button
              onClick={() => handleImproveTopic('DBMS', 'Normalization (1NF to BCNF)')}
              className="p-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-between transition-all duration-200 group cursor-pointer shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold block text-white">Practice Weak Topics</span>
                  <span className="text-[10px] text-amber-400/80">DBMS Normalization</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/quiz')}
              className="p-4 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 flex items-center justify-between transition-all duration-200 group cursor-pointer shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold block text-white">Generate AI Quiz</span>
                  <span className="text-[10px] text-purple-400/80">Custom Questions</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/doubt-solver')}
              className="p-4 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-between transition-all duration-200 group cursor-pointer shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold block text-white">Ask AI Tutor</span>
                  <span className="text-[10px] text-cyan-400/80">24/7 Doubt Solver</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/roadmap')}
              className="p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-between transition-all duration-200 group cursor-pointer shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Map className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold block text-white">Learning Roadmap</span>
                  <span className="text-[10px] text-emerald-400/80">Step-by-Step Tree</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

          {/* Section 3: Subject-wise Performance Breakdown */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-cyan-400" /> Subject-wise Performance Breakdown
                </h2>
                <p className="text-xs text-slate-400">Current progress and accuracy per curriculum domain</p>
              </div>
              <Badge variant="cyan" size="md">5 Active Subjects</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subj) => (
                <div key={subj.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{subj.name}</span>
                    <span className="text-xs font-bold text-cyan-400">{subj.progress}%</span>
                  </div>
                  
                  <p className="text-xs text-slate-400">Current Topic: <strong className="text-slate-200">{subj.currentTopic}</strong></p>
                  
                  <ProgressBar progress={subj.progress} color={subj.color} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Dual Weak Topics vs Strong Topics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Weak Topics */}
            <div className="p-6 rounded-3xl glass-panel border border-amber-500/30 bg-slate-900/60 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" /> Priority Weak Topics
                </h3>
                <span className="text-[11px] bg-amber-500/10 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/20 font-semibold">
                  Action Required
                </span>
              </div>

              <div className="space-y-3">
                {student.weakAreas.map((w, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between hover:border-amber-500/40 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">{w.subject}</span>
                        <span className="text-xs text-slate-400"> — {w.topic}</span>
                      </div>
                      <span className="text-[10px] text-rose-400 font-semibold block mt-0.5">
                        Accuracy: {w.score}% • {w.severity} Severity
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      icon={ArrowRight}
                      onClick={() => handleImproveTopic(w.subject, w.topic)}
                    >
                      Improve
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Strong Topics */}
            <div className="p-6 rounded-3xl glass-panel border border-emerald-500/30 bg-slate-900/60 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> Mastered Strong Topics
                </h3>
                <span className="text-[11px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                  High Proficiency
                </span>
              </div>

              <div className="space-y-3">
                {strongTopics.map((s, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">{s.subject}</span>
                        <span className="text-xs text-slate-400"> — {s.topic}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
                        {s.status}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                      {s.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Section 5: AI Learning Recommendations Callout Box */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-cyan-400 p-0.5 shrink-0 shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[12px] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  AI Learning Recommendations
                </h3>
                <p className="text-xs text-slate-400">Custom sequence generated by LearnMate AI diagnostic engine</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">What to Study Next</span>
                <h4 className="text-sm font-bold text-white mt-1">DBMS Normalization</h4>
                <p className="text-[11px] text-slate-400 mt-1">Strengthen 1NF through BCNF rules</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">Target Weak Area</span>
                <h4 className="text-sm font-bold text-white mt-1">Python Recursion</h4>
                <p className="text-[11px] text-slate-400 mt-1">Practice base case conditions</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">Suggested Difficulty</span>
                <h4 className="text-sm font-bold text-white mt-1">Intermediate Level</h4>
                <p className="text-[11px] text-slate-400 mt-1">Ready for 5-question AI quizzes</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Recommended Flow</span>
                <h4 className="text-sm font-bold text-white mt-1">Assess → Practice → Solve</h4>
                <p className="text-[11px] text-slate-400 mt-1">Follow the visual roadmap tree</p>
              </div>

            </div>
          </div>

          {/* Section 6: Progress & Weekly Activity Trend */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <ActivityChart activityData={student.weeklyActivity} />
            </div>

            <div className="lg:col-span-4 p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" /> Retention & Velocity
                </h3>
                <p className="text-xs text-slate-400 mt-1">Weekly progress trends</p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Target Study Hours</span>
                    <span className="text-cyan-400">11.5 / 15 hrs</span>
                  </div>
                  <ProgressBar progress={76} color="cyan" size="sm" />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Quiz Completion Rate</span>
                    <span className="text-purple-400">82%</span>
                  </div>
                  <ProgressBar progress={82} color="purple" size="sm" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                ⚡ <strong className="text-slate-200">AI Pace Insight:</strong> Maintaining 2 hours/day will complete Python & DBMS modules by Friday.
              </div>
            </div>
          </div>

          {/* Section 7: Recent Quiz Attempts Log */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" /> Recent Assessment & Quiz Log
                </h3>
                <p className="text-xs text-slate-400">Historical performance breakdown</p>
              </div>
              <Badge variant="purple" size="md">Session Log</Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Topic</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Accuracy</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {recentAttempts.map((attempt) => (
                    <tr key={attempt.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 px-4 text-slate-200 font-bold">{attempt.subject}</td>
                      <td className="py-3.5 px-4 text-slate-300">{attempt.topic}</td>
                      <td className="py-3.5 px-4 font-bold text-white">{attempt.score}</td>
                      <td className="py-3.5 px-4">
                        <span className={`font-bold ${attempt.accuracy >= 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {attempt.accuracy}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{attempt.date}</td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleImproveTopic(attempt.subject, attempt.topic)}
                        >
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
};
