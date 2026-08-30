import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Brain, 
  Bot, 
  FileText, 
  BarChart2, 
  Target, 
  Calendar,
  CheckCircle2,
  Zap,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Button } from '../components/common/Button';

export const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'Personalized Learning',
      description: 'Adapts to your individual pace, strengths, and knowledge gaps with real-time curriculum adjustments.',
      color: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-400'
    },
    {
      icon: Bot,
      title: 'AI Doubt Solver',
      description: '24/7 instant answers with step-by-step code snippets, structural diagrams, and contextual explanations.',
      color: 'from-purple-500 to-indigo-600',
      textColor: 'text-purple-400'
    },
    {
      icon: FileText,
      title: 'Smart Quiz Generator',
      description: 'Generates targeted practice quizzes tailored specifically to your weak conceptual areas.',
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-400'
    },
    {
      icon: BarChart2,
      title: 'Performance Analysis',
      description: 'Deep analytical dashboards tracking subject accuracy, retention rates, and topic mastery.',
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400'
    },
    {
      icon: Target,
      title: 'Smart Recommendations',
      description: 'AI suggests your exact next study topic based on quantitative assessment data.',
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400'
    },
    {
      icon: Calendar,
      title: 'AI Study Planner',
      description: 'Optimizes your daily study schedule around upcoming exam deadlines and target mastery goals.',
      color: 'from-rose-500 to-pink-600',
      textColor: 'text-rose-400'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Assess',
      subtitle: 'Take a short assessment',
      description: 'Complete quick 5-minute topic evaluations to establish your initial knowledge baseline.'
    },
    {
      num: '02',
      title: 'Analyze',
      subtitle: 'AI evaluates your level',
      description: 'Our engine identifies exact conceptual strengths and pinpoints hidden knowledge gaps.'
    },
    {
      num: '03',
      title: 'Personalize',
      subtitle: 'Custom roadmap created',
      description: 'AI builds a step-by-step visual learning path tailored specifically to your speed.'
    },
    {
      num: '04',
      title: 'Improve',
      subtitle: 'Practice & receive feedback',
      description: 'Engage with AI doubt solving, adaptive practice, and continuous recommendations.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        
        {/* Glow backdrop circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-6 shadow-md shadow-cyan-500/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen EdTech AI Platform</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                Learn Smarter. <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Learn Your Way.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
                An AI-powered learning companion that understands your strengths, identifies your weak areas, and creates a personalized learning journey just for you.
              </p>

              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <Button
                  variant="gradient"
                  size="lg"
                  icon={ArrowRight}
                  onClick={() => navigate('/login')}
                  className="w-full sm:w-auto text-base"
                >
                  Start Learning →
                </Button>

                <a href="#features">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto text-base"
                  >
                    Explore Features
                  </Button>
                </a>
              </div>

              {/* Trust stats */}
              <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6 w-full max-w-lg">
                <div>
                  <div className="text-2xl font-bold text-white">94%</div>
                  <div className="text-xs text-slate-400">Mastery Speed Up</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">10k+</div>
                  <div className="text-xs text-slate-400">Active Learners</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">4.9/5</div>
                  <div className="text-xs text-slate-400">Student Rating</div>
                </div>
              </div>

            </div>

            {/* Right Interactive Visual Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-md p-6 rounded-3xl glass-panel border border-slate-800 shadow-2xl glow-cyan animate-float">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400">LearnMate Cycle v2.4</span>
                </div>

                {/* Simulated AI Radar/Cycle Graphic */}
                <div className="py-6 flex flex-col items-center justify-center relative">
                  
                  <div className="w-44 h-44 rounded-full border-2 border-dashed border-cyan-500/30 flex items-center justify-center relative animate-spin-slow">
                    <div className="w-32 h-32 rounded-full border border-purple-500/40 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/40">
                        <Brain className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Cycle Nodes */}
                  <div className="absolute top-2 right-2 bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Assess & Analyze
                  </div>

                  <div className="absolute bottom-2 left-2 bg-slate-900/90 border border-purple-500/40 text-purple-300 text-xs px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-purple-400" /> Personalized Path
                  </div>

                </div>

                {/* Interactive Status Footer */}
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Current AI Target:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Python Recursion (+24%)
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 bg-slate-950/60 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3.5 py-1 rounded-full border border-cyan-500/20">
              Powerful Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
              Everything You Need to Master Any Subject
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              Built on cognitive science and advanced machine learning to deliver a tailored edtech experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel border border-slate-800/80 glass-card-hover flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} p-0.5 mb-5 shadow-lg`}>
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                      <feat.icon className={`w-6 h-6 ${feat.textColor}`} />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3.5 py-1 rounded-full border border-purple-500/20">
              The Learning Cycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
              How LearnMate AI Transforms Your Studies
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              Assess → Analyze → Personalize → Learn → Practice → Evaluate → Recommend
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-card border border-slate-800 relative flex flex-col justify-between"
              >
                <div className="text-4xl font-black text-slate-800 mb-4">{step.num}</div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-xs font-semibold text-cyan-400 mb-3">{step.subtitle}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                </div>

                <div className="mt-6 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl glow-cyan">
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Ready to transform the way you learn?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
              Join thousands of students mastering complex subjects with personalized AI recommendations.
            </p>

            <Button
              variant="gradient"
              size="lg"
              icon={ArrowRight}
              onClick={() => navigate('/login')}
              className="text-base px-8 py-3.5 shadow-xl shadow-cyan-500/25"
            >
              Start Your Learning Journey →
            </Button>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span className="text-lg font-bold text-white">LearnMate AI</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                AI-powered personalized education platform built for hackathon innovation.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Product</h4>
              <ul className="flex flex-col gap-2 text-xs text-slate-400">
                <li><a href="#features" className="hover:text-cyan-400">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-cyan-400">How It Works</a></li>
                <li><a href="#home" className="hover:text-cyan-400">Demo Flow</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Resources</h4>
              <ul className="flex flex-col gap-2 text-xs text-slate-400">
                <li><Link to="/assessment" className="hover:text-cyan-400">Subject Assessment</Link></li>
                <li><Link to="/doubt-solver" className="hover:text-cyan-400">AI Doubt Solver</Link></li>
                <li><Link to="/roadmap" className="hover:text-cyan-400">Learning Roadmap</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Hackathon Info</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Theme: AI with Education<br />
                Tagline: "Learn Smarter. Learn Your Way."
              </p>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
            © 2026 LearnMate AI. All rights reserved. Built for hackathon demonstration.
          </div>
        </div>
      </footer>

    </div>
  );
};
