import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from './Button';

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
              LearnMate <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">AI</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase -mt-1">
              Smart Education
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#home" className="hover:text-cyan-400 transition-colors duration-200">Home</a>
          <a href="#features" className="hover:text-cyan-400 transition-colors duration-200">Features</a>
          <a href="#how-it-works" className="hover:text-cyan-400 transition-colors duration-200">How It Works</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors duration-200">About</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
          >
            Sign In
          </Link>
          <Button
            variant="gradient"
            size="md"
            icon={ArrowRight}
            onClick={() => navigate('/dashboard')}
          >
            Start Learning
          </Button>
        </div>

      </div>
    </header>
  );
};
