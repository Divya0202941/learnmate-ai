import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Target, 
  Map, 
  MessageSquare, 
  HelpCircle, 
  BarChart3, 
  User, 
  LogOut, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Assessment', icon: Target, path: '/assessment' },
    { label: 'Learning Roadmap', icon: Map, path: '/roadmap' },
    { label: 'AI Doubt Solver', icon: MessageSquare, path: '/doubt-solver' },
    { label: 'AI Quiz Generator', icon: HelpCircle, path: '/quiz' },
    { label: 'Performance', icon: BarChart3, path: '/performance' },
    { label: 'Profile & Settings', icon: User, path: '/profile' }
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 min-h-screen flex flex-col justify-between p-4 sticky top-0 h-screen z-40">
      <div className="flex flex-col gap-6">
        
        {/* Brand */}
        <NavLink to="/dashboard" className="flex items-center gap-3 px-2 py-1 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-md shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-tight flex items-center gap-1">
              LearnMate <span className="text-cyan-400">AI</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase -mt-1">
              Student Workspace
            </span>
          </div>
        </NavLink>

        {/* Nav list */}
        <nav className="flex flex-col gap-1.5 mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-md shadow-cyan-500/5 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="border-t border-slate-800/80 pt-4 mt-auto">
        <button
          onClick={() => navigate('/login')}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
