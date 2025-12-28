
import React from 'react';

interface Props {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const DashboardCard: React.FC<Props> = ({ title, icon, children, className = "", onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`glass bg-white dark:bg-zinc-950 rounded-[2.5rem] p-6 shadow-[0_4px_20px_-1px_rgba(0,0,0,0.05)] dark:shadow-none border border-slate-50 dark:border-zinc-900 transition-all duration-300 ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''} ${className}`}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-slate-800 dark:text-zinc-100 text-lg tracking-tight">{title}</h3>
        {icon && <div className="text-indigo-500">{icon}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardCard;
