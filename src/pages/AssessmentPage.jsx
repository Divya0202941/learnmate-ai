import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useLearning } from '../context/LearningContext';
import { 
  Target, 
  BookOpen, 
  Clock, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Code,
  Coffee,
  Network,
  Database,
  Wifi
} from 'lucide-react';

const iconMap = {
  Code,
  Coffee,
  Network,
  Database,
  Wifi
};

export const AssessmentPage = () => {
  const navigate = useNavigate();
  const { subjects, prepareQuizSession } = useLearning();

  const [selectedSubjectId, setSelectedSubjectId] = useState('python');
  const activeSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];
  const [selectedTopicName, setSelectedTopicName] = useState(activeSubject.topics[3]?.name || activeSubject.topics[0]?.name);
  const [difficulty, setDifficulty] = useState('Medium');

  const handleSubjectChange = (subjId) => {
    setSelectedSubjectId(subjId);
    const subj = subjects.find(s => s.id === subjId);
    if (subj && subj.topics.length > 0) {
      setSelectedTopicName(subj.topics[0].name);
    }
  };

  const handleStartAssessment = () => {
    prepareQuizSession(selectedSubjectId, selectedTopicName, difficulty);
    navigate('/assessment/quiz');
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Diagnostic Assessment" subtitle="Select subject, topic, and difficulty to generate your evaluation" />

        <main className="p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* Header Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 border border-cyan-500/30 relative overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                  Step-by-Step Configuration
                </span>
                <h1 className="text-2xl font-extrabold text-white tracking-tight mt-2">
                  AI-Powered Diagnostic Assessment
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  Our algorithm will evaluate your response accuracy and pinpoint exact knowledge gaps to build your personalized learning path.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-300">Adaptive Difficulty Engine Active</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 8 cols: Selection Steps */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* STEP 1: Select Subject */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-xs flex items-center justify-center">1</div>
                  <h2 className="text-lg font-bold text-white">Select Subject</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map((subj) => {
                    const IconComp = iconMap[subj.iconName] || Code;
                    const isSelected = subj.id === selectedSubjectId;

                    return (
                      <div
                        key={subj.id}
                        onClick={() => handleSubjectChange(subj.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center gap-3.5 ${
                          isSelected
                            ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${subj.gradient} text-white shrink-0`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm">{subj.name}</h3>
                          <span className="text-[11px] text-slate-400">{subj.topics.length} topics</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Select Topic */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-xs flex items-center justify-center">2</div>
                  <h2 className="text-lg font-bold text-white">Select Topic ({activeSubject.name})</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeSubject.topics.map((top) => {
                    const isSelected = top.name === selectedTopicName;
                    return (
                      <div
                        key={top.id}
                        onClick={() => setSelectedTopicName(top.name)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                          isSelected
                            ? 'bg-purple-500/10 border-purple-500 text-white shadow-md shadow-purple-500/10'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-purple-400' : 'text-slate-600'}`} />
                          <span className="text-xs font-semibold">{top.name}</span>
                        </div>

                        {top.isWeak && (
                          <span className="text-[10px] bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded-md border border-rose-500/20 font-semibold">
                            Weak Area ⚠️
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: Select Difficulty */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-xs flex items-center justify-center">3</div>
                  <h2 className="text-lg font-bold text-white">Select Difficulty</h2>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {['Easy', 'Medium', 'Hard'].map((diff) => {
                    const isSelected = diff === difficulty;
                    return (
                      <button
                        key={diff}
                        type="button"
                        onClick={() => setDifficulty(diff)}
                        className={`py-3 px-4 rounded-xl border font-bold text-xs sm:text-sm transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {diff}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right 4 cols: Assessment Summary Box & Start CTA */}
            <div className="lg:col-span-4">
              <div className="p-6 rounded-3xl glass-panel border border-cyan-500/30 sticky top-28 space-y-6">
                
                <div>
                  <span className="text-xs font-bold uppercase text-cyan-400 tracking-wider">Assessment Summary</span>
                  <h3 className="text-xl font-extrabold text-white mt-1">{activeSubject.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedTopicName}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-cyan-400" /> Total Questions
                    </span>
                    <span className="font-bold text-white">5 Questions</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-400" /> Estimated Time
                    </span>
                    <span className="font-bold text-white">5 Minutes</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" /> Target Difficulty
                    </span>
                    <span className="font-bold text-amber-400">{difficulty}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                  💡 <span className="text-slate-200 font-semibold">AI Tip:</span> Take your time to carefully read code snippets. Your submission will trigger personalized roadmap updates.
                </div>

                <Button
                  variant="gradient"
                  size="lg"
                  icon={ArrowRight}
                  fullWidth
                  onClick={handleStartAssessment}
                  className="py-3.5 text-base shadow-xl shadow-cyan-500/20"
                >
                  Start Assessment →
                </Button>

              </div>
            </div>

          </div>

        </main>
      </div>

    </div>
  );
};
