import React from 'react';
import { ArrowRight, Code, Coffee, Network, Database, Wifi } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';
import { Button } from '../common/Button';

const iconMap = {
  Code,
  Coffee,
  Network,
  Database,
  Wifi
};

export const SubjectCard = ({ subject, onContinue }) => {
  const IconComponent = iconMap[subject.iconName] || Code;

  return (
    <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 glass-card-hover flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${subject.gradient} text-white shadow-md shadow-cyan-500/10`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base group-hover:text-cyan-400 transition-colors">
                {subject.name}
              </h3>
              <p className="text-xs text-slate-400 font-medium">Topic: <span className="text-slate-200">{subject.currentTopic}</span></p>
            </div>
          </div>
          <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
            {subject.progress}%
          </span>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 mb-4">
          {subject.description}
        </p>

        <ProgressBar progress={subject.progress} color={subject.color} size="sm" className="mb-4" />
      </div>

      <div className="pt-2 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          icon={ArrowRight}
          onClick={() => onContinue(subject)}
          className="w-full sm:w-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
