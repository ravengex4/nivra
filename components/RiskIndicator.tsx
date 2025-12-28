
import React from 'react';

interface Props {
  riskScore: number;
  status: string;
}

const RiskIndicator: React.FC<Props> = ({ riskScore, status }) => {
  const getColor = (score: number) => {
    if (score < 30) return 'text-emerald-500';
    if (score < 70) return 'text-yellow-500';
    return 'text-rose-500';
  };

  const getBgColor = (score: number) => {
    if (score < 30) return 'bg-emerald-500';
    if (score < 70) return 'bg-yellow-500';
    return 'bg-rose-500';
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-100 dark:text-slate-800"
          />
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={364}
            strokeDashoffset={364 - (364 * riskScore) / 100}
            className={`${getColor(riskScore)} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${getColor(riskScore)}`}>{riskScore}%</span>
          <span className="text-[10px] uppercase font-bold text-slate-400">Next Risk</span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${getBgColor(riskScore)} animate-pulse`}></div>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{status}</span>
      </div>
    </div>
  );
};

export default RiskIndicator;
