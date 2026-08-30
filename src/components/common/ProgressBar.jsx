import React from 'react';

export const ProgressBar = ({
  progress = 0,
  size = 'md', // 'sm', 'md', 'lg'
  color = 'cyan', // 'cyan', 'purple', 'emerald', 'amber', 'gradient'
  showLabel = false,
  className = ''
}) => {
  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const gradients = {
    cyan: 'from-cyan-500 to-blue-500',
    purple: 'from-purple-500 to-indigo-500',
    emerald: 'from-emerald-400 to-teal-500',
    amber: 'from-amber-400 to-orange-500',
    gradient: 'from-cyan-400 via-blue-500 to-purple-500'
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5 font-medium">
          <span>Progress</span>
          <span className="text-cyan-400 font-semibold">{clampedProgress}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden ${heights[size]} border border-slate-700/40`}>
        <div
          className={`h-full bg-gradient-to-r ${gradients[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
