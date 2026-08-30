import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, color = 'cyan', badgeText }) => {
  const colorGradients = {
    cyan: 'from-cyan-500/20 to-blue-500/5 text-cyan-400 border-cyan-500/30',
    purple: 'from-purple-500/20 to-indigo-500/5 text-purple-400 border-purple-500/30',
    emerald: 'from-emerald-500/20 to-teal-500/5 text-emerald-400 border-emerald-500/30',
    amber: 'from-amber-500/20 to-orange-500/5 text-amber-400 border-amber-500/30'
  };

  const iconBg = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-b ${colorGradients[color]} border backdrop-blur-md glass-card-hover flex flex-col justify-between relative overflow-hidden group`}>
      
      {/* Background glow */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-cyan-500/5 blur-2xl group-hover:bg-cyan-500/10 transition-all duration-300 pointer-events-none" />

      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-xl border ${iconBg[color]}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{value}</span>
        {badgeText && (
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            {badgeText}
          </span>
        )}
      </div>

      {subtitle && <p className="text-xs text-slate-400 font-medium mt-1">{subtitle}</p>}
    </div>
  );
};
