import React from 'react';
import { Bell, Search, Sparkles } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useNavigate } from 'react-router-dom';

export const Header = ({ title, subtitle }) => {
  const { student } = useLearning();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      
      {/* Greeting or Title */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          {title || `Good morning, ${student.name.split(' ')[0]} 👋`}
        </h1>
        <p className="text-xs text-slate-400 font-medium mt-0.5">
          {subtitle || "Let's continue your personalized learning journey."}
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        
        {/* Search Input */}
        <div className="relative hidden sm:block w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search subjects, topics..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
        </button>

        {/* Profile Chip */}
        <div
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2.5 pl-2 pr-3 py-1 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl cursor-pointer transition-colors"
        >
          <img
            src={student.avatar}
            alt={student.name}
            className="w-7 h-7 rounded-lg object-cover ring-1 ring-cyan-500/40"
          />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-200 leading-none">{student.name}</span>
            <span className="text-[10px] text-cyan-400 font-medium leading-tight mt-0.5">{student.level}</span>
          </div>
        </div>

      </div>
    </header>
  );
};
