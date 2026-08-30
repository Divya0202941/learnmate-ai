import React from 'react';
import { Calendar, Flame } from 'lucide-react';

export const ActivityChart = ({ activityData = [] }) => {
  const maxHours = Math.max(...activityData.map(d => d.hours), 4);

  return (
    <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" /> Weekly Activity
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Study hours & quiz sessions logged</p>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-xl border border-amber-500/20 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>7 Day Streak</span>
        </div>
      </div>

      <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 px-2">
        {activityData.map((item, idx) => {
          const heightPercent = Math.max(10, Math.round((item.hours / maxHours) * 100));
          const isToday = item.day === 'Wed' || item.day === 'Fri';

          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
              
              {/* Tooltip on hover */}
              <div className="absolute -top-8 bg-slate-800 text-cyan-300 text-[10px] font-semibold px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-10 border border-slate-700">
                {item.hours}h ({item.quizzesTaken} quizzes)
              </div>

              {/* Bar */}
              <div className="w-full bg-slate-800/70 rounded-lg h-32 flex items-end overflow-hidden p-0.5">
                <div
                  className={`w-full rounded-md transition-all duration-500 group-hover:brightness-125 ${
                    isToday
                      ? 'bg-gradient-to-t from-cyan-500 to-blue-400 shadow-lg shadow-cyan-500/30'
                      : 'bg-gradient-to-t from-slate-700 to-slate-500'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              <span className={`text-xs font-medium ${isToday ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}>
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
