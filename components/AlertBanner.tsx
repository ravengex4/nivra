
import React, { useState, useEffect } from 'react';
import { Alert } from '../types';
import { AlertTriangle, X, Bell } from 'lucide-react';

interface Props {
  alert: Alert;
  onDismiss: () => void;
}

const AlertBanner: React.FC<Props> = ({ alert, onDismiss }) => {
  const [timeLeft, setTimeLeft] = useState(alert.countdown || 0);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`fixed top-4 inset-x-4 z-50 p-4 rounded-2xl shadow-2xl transition-all duration-500 pulsing ${timeLeft > 0 ? 'bg-rose-600 text-white' : 'bg-indigo-600 text-white'}`}>
      <div className="flex items-start gap-4">
        <div className="bg-white/20 p-2 rounded-xl">
          {timeLeft > 0 ? <AlertTriangle className="w-6 h-6 animate-bounce" /> : <Bell className="w-6 h-6" />}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-lg leading-none mb-1">
            {timeLeft > 0 ? 'Seizure Pre-Alert!' : 'Notification'}
          </h4>
          <p className="text-sm text-white/90">{alert.message}</p>
          {timeLeft > 0 && (
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase font-bold text-white/70">Estimated Onset</p>
                <p className="text-3xl font-black tracking-tighter">{formatTime(timeLeft)}</p>
              </div>
              <button onClick={onDismiss} className="bg-white text-rose-600 font-bold px-4 py-2 rounded-xl text-sm shadow-lg active:scale-95 transition-transform">
                I'm Safe
              </button>
            </div>
          )}
        </div>
        <button onClick={onDismiss} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AlertBanner;
