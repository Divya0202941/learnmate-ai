import React from 'react';
import { AlertTriangle, ArrowRight, Zap } from 'lucide-react';
import { Button } from '../common/Button';

export const WeakAreasCard = ({ weakAreas = [], onImprove }) => {
  return (
    <div className="p-5 rounded-2xl glass-panel border border-amber-500/20 bg-slate-900/60 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" /> Weak Areas Identified
          </h3>
          <span className="text-[11px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            Needs Revision
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          AI detected lower accuracy in these topics. Strengthening them will raise overall score.
        </p>

        <div className="flex flex-col gap-2.5 mb-5">
          {weakAreas.map((area, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-amber-400 text-sm">⚠️</span>
                <div>
                  <span className="text-xs font-bold text-slate-200">{area.subject}</span>
                  <span className="text-xs text-slate-400 font-medium"> — {area.topic}</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
                {area.score}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="primary"
        size="md"
        icon={Zap}
        onClick={onImprove}
        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20"
      >
        Improve These Topics
      </Button>
    </div>
  );
};
