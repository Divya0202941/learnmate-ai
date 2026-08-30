import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Mail, Lock, UserCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('alex.johnson@university.edu');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to dashboard for MVP flow
    navigate('/dashboard');
  };

  const handleDemoStudent = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/25">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              LearnMate <span className="text-cyan-400">AI</span>
            </span>
          </Link>
          
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isSignUp ? 'Start your AI-powered learning journey' : 'Sign in to access your personalized dashboard'}
          </p>
        </div>

        {/* Form Card */}
        <div className="p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl relative">
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Alex Johnson"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="md"
              icon={ArrowRight}
              fullWidth
              className="mt-2"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>

          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <span className="relative bg-slate-950 px-3 text-[11px] font-semibold text-slate-500 uppercase">
              Or Fast Track Demo
            </span>
          </div>

          {/* Demo Student CTA Button */}
          <Button
            variant="secondary"
            size="md"
            icon={UserCheck}
            iconPosition="left"
            fullWidth
            onClick={handleDemoStudent}
            className="border-cyan-500/30 hover:border-cyan-500/60 bg-cyan-500/10 text-cyan-300"
          >
            Continue as Demo Student
          </Button>

          {/* Account toggle */}
          <div className="mt-6 text-center text-xs text-slate-400">
            {isSignUp ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-cyan-400 font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                New to LearnMate AI?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-cyan-400 font-semibold hover:underline"
                >
                  Create an account
                </button>
              </p>
            )}
          </div>

        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};
