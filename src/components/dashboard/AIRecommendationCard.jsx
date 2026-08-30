import React from 'react';
import { Sparkles, ArrowRight, Bot, Target } from 'lucide-react';
import { Button } from '../common/Button';

export const AIRecommendationCard = ({ recommendation, onStart }) => {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 glass-card-hover relative overflow-hidden shadow-xl shadow-purple-900/10">
      
      {/* Glow highlight background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-cyan-400 p-0.5 shrink-0 shadow-lg shadow-purple-500/25">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-cyan-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI Recommendation
              </span>
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20 font-semibold">
                Personalized
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {recommendation?.title || "Focus Area Suggested by LearnMate AI"}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              "{recommendation?.reason || "Based on your recent quiz performance, I recommend revising DBMS Normalization before moving to Transactions."}"
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full sm:w-auto">
          <Button
            variant="gradient"
            size="md"
            icon={ArrowRight}
            onClick={onStart}
            className="w-full sm:w-auto shadow-purple-500/20"
          >
            {recommendation?.actionText || "Start Recommended Topic"}
          </Button>
        </div>

      </div>
    </div>
  );
};
