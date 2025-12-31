
import React, { useState, useEffect } from 'react';
import { User, DeviceStats, SeizureLog } from '../types';
import DashboardCard from '../components/DashboardCard';
import { Bluetooth, Heart, Activity, Calendar, Wind, Battery, AlertTriangle } from 'lucide-react';
import { TabType } from '../components/BottomNav';
import { IMAGE_ASSETS } from '../assets/images';
import SmartImage from '../components/SmartImage';

const mockHistory: SeizureLog[] = [
  { id: '1', timestamp: '2023-10-24 14:30', duration: '2m 15s', severity: 'Moderate' },
  { id: '2', timestamp: '2023-10-21 09:12', duration: '1m 05s', severity: 'Mild' },
  { id: '3', timestamp: '2023-10-15 22:45', duration: '3m 10s', severity: 'Severe' },
  { id: '4', timestamp: '2023-10-10 11:20', duration: '0m 45s', severity: 'Mild' },
  { id: '5', timestamp: '2023-10-02 03:15', duration: '1m 55s', severity: 'Moderate' },
];

const PatientDashboard: React.FC<{ user: User; onTabChange?: (tab: TabType) => void; bandImage?: string; device: DeviceStats; seizureHistory: Array<{timestamp: string, readings: DeviceStats, minutesUntilSeizure: number}>; onClearSeizureHistory?: () => void }> = ({ user, onTabChange, bandImage, device, seizureHistory, onClearSeizureHistory }) => {

  const recentAttacks = mockHistory.slice(0, 3);

  return (
    <div className="space-y-6 relative">
      {/* Integrated Hero - Edge-to-edge layout */}
      <div className="relative flex flex-col items-center justify-center overflow-hidden min-h-[450px] pt-12 pb-12 -mt-8">
        {/* Dynamic ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-indigo-500/5 to-transparent opacity-40 blur-[100px] pointer-events-none"></div>
        
        {/* Large floating device visual */}
        <div className="relative mb-8 group">
          <div className="w-64 h-64 flex items-center justify-center relative z-10 transition-transform duration-700 group-hover:scale-105">
            <SmartImage 
              src={bandImage || IMAGE_ASSETS.device.band_pro} 
              alt="Nivra Band Pro" 
              className="text-[10rem] filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_25px_30px_rgba(99,102,241,0.2)]" 
            />
          </div>
        </div>

        <div className="text-center space-y-4 z-10 px-4">
          <div className="space-y-1">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Nivra Band Pro</h3>
            <p className="text-indigo-500 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.5em]">Live Monitoring System</p>
          </div>
          
          <div className="flex items-center justify-center gap-3">
            {/* Black Status Pills */}
            <div className="flex items-center gap-2 px-5 py-2.5 bg-black rounded-full border border-zinc-800 shadow-xl shadow-black/20">
              <Bluetooth className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Connected</span>
            </div>
            
            <div className="flex items-center gap-2 px-5 py-2.5 bg-black rounded-full border border-zinc-800 shadow-xl shadow-black/20">
              <Battery className={`w-4 h-4 ${device.battery < 20 ? 'text-rose-500' : 'text-zinc-400'}`} />
              <span className="text-[10px] font-black text-white uppercase tracking-widest tabular-nums">{device.battery}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Biometrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard title="Live Vitals" icon={<Heart className="w-5 h-5" />} className="md:col-span-3 !bg-transparent !border-none !shadow-none !p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="p-6 bg-white dark:bg-zinc-950 rounded-[2.5rem] text-center border border-slate-100 dark:border-zinc-900 shadow-sm transition-all hover:border-rose-500/20">
              <Heart className="w-6 h-6 mx-auto mb-3 text-rose-500" />
              <p className="text-3xl font-black text-slate-900 dark:text-zinc-100 tabular-nums">{device.heartRate.toFixed(1)}</p>
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-black tracking-widest mt-1">Heart Rate (BPM)</p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-950 rounded-[2.5rem] text-center border border-slate-100 dark:border-zinc-900 shadow-sm transition-all hover:border-indigo-500/20">
              <Wind className="w-6 h-6 mx-auto mb-3 text-indigo-500" />
              <p className="text-3xl font-black text-slate-900 dark:text-zinc-100 tabular-nums">{device.spo2.toFixed(1)}%</p>
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-black tracking-widest mt-1">Oxygen (SPO2)</p>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Activity Log */}
      <DashboardCard title="Recent Activity" icon={<Calendar className="w-5 h-5" />}>
        <div className="space-y-3">
          {recentAttacks.map(log => (
            <div key={log.id} className="flex items-center justify-between p-4 border border-slate-100 dark:border-zinc-900 rounded-[2rem] bg-slate-50/50 dark:bg-zinc-900/30 transition-all hover:bg-slate-50 dark:hover:bg-zinc-900 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${log.severity === 'Severe' ? 'bg-rose-500 text-white' : 'bg-white dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 border border-slate-100 dark:border-zinc-700'}`}>
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-800 dark:text-zinc-200">{log.severity} Event</p>
                  <p className="text-[9px] text-slate-400 dark:text-zinc-500 font-black uppercase tracking-widest mt-0.5">{log.timestamp}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-500/20">{log.duration}</p>
              </div>
            </div>
          ))}
          <button 
            onClick={() => onTabChange && onTabChange('records')}
            className="w-full py-4 text-indigo-500 text-xs font-black hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-2xl transition-all uppercase tracking-widest mt-2"
          >
            View Full History
          </button>
        </div>
      </DashboardCard>

      {/* Seizure Detection History */}
      {seizureHistory.length > 0 && (
        <DashboardCard title="Seizure Detection History" icon={<AlertTriangle className="w-5 h-5" />}>
          <div className="space-y-3">
            <div className="flex justify-end mb-2">
              <button 
                onClick={onClearSeizureHistory}
                className="text-xs text-rose-500 hover:text-rose-700 font-bold uppercase tracking-widest"
              >
                Clear History
              </button>
            </div>
            {seizureHistory.slice(-5).reverse().map((detection, index) => (
              <div key={index} className="p-4 border border-rose-100 dark:border-rose-900/30 rounded-[2rem] bg-rose-50/50 dark:bg-rose-900/10 transition-all shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    <p className="text-sm font-black text-rose-700 dark:text-rose-300">Seizure Detected</p>
                  </div>
                  <p className="text-[9px] text-rose-500 font-black uppercase tracking-widest">
                    T minus {detection.minutesUntilSeizure} min
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 bg-white dark:bg-zinc-800 rounded-xl border border-rose-100 dark:border-rose-800">
                    <p className="text-lg font-black text-rose-600 tabular-nums">{detection.readings.heartRate.toFixed(1)}</p>
                    <p className="text-[8px] text-rose-500 uppercase font-black tracking-widest">Heart Rate</p>
                  </div>
                  <div className="p-2 bg-white dark:bg-zinc-800 rounded-xl border border-rose-100 dark:border-rose-800">
                    <p className="text-lg font-black text-rose-600 tabular-nums">{detection.readings.temperature.toFixed(1)}°C</p>
                    <p className="text-[8px] text-rose-500 uppercase font-black tracking-widest">Temperature</p>
                  </div>
                  <div className="p-2 bg-white dark:bg-zinc-800 rounded-xl border border-rose-100 dark:border-rose-800">
                    <p className="text-lg font-black text-rose-600 tabular-nums">{detection.readings.spo2.toFixed(1)}%</p>
                    <p className="text-[8px] text-rose-500 uppercase font-black tracking-widest">Oxygen</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      )}
    </div>
  );
};

export default PatientDashboard;
