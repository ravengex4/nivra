
import React from 'react';
import { LayoutDashboard, FileText, Users, User } from 'lucide-react';

export type TabType = 'dashboard' | 'records' | 'marketplace' | 'profile';

interface Props {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const BottomNav: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'records', label: 'History', icon: FileText },
    { id: 'marketplace', label: 'Circle of Care', icon: Users },
    { id: 'profile', label: 'Me', icon: User },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full border-t border-slate-200/30 dark:border-zinc-800/30 bg-white/60 dark:bg-black/60 backdrop-blur-xl transition-all duration-300 safe-area-bottom">
      <div className="max-w-4xl mx-auto px-6 py-2 flex justify-between items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 transition-all duration-300 flex-1 py-1 ${
                isActive 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-indigo-500/10 scale-110' : 'scale-100'}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              </div>
              <span className={`text-[8px] font-black uppercase tracking-widest transition-all duration-300 ${isActive ? 'opacity-100 transform translate-y-0 h-auto' : 'opacity-0 transform translate-y-1 h-0 overflow-hidden'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
