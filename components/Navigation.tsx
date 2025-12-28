
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { Shield } from 'lucide-react';

interface Props {
  user: User | null;
}

const Navigation: React.FC<Props> = ({ user }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={`sticky top-0 z-40 bg-white/90 dark:bg-black/80 backdrop-blur-md border-b border-slate-100 dark:border-zinc-800 px-4 py-3 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-500 p-1.5 rounded-lg">
            < Shield className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Nivra
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-zinc-900 rounded-full">
            <div className={`w-2 h-2 rounded-full bg-emerald-500 animate-pulse`}></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400">Live Sync</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
