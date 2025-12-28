import React, { useState } from 'react';
import { 
  Battery, Bluetooth, RefreshCw, Zap, Edit2, Check, Volume2, Search, X 
} from 'lucide-react';
import SmartImage from '../components/SmartImage';
import BandImage from '../assets/C21hatGPT_Image_Dec_27__2025__07_46_49_PM-removebg-preview.png';

const MyDevice: React.FC = () => {
  const [deviceName, setDeviceName] = useState("Nivra Band Pro");
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(deviceName);
  
  const [vibration, setVibration] = useState(80);
  const [autoSync, setAutoSync] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFinding, setIsFinding] = useState(false);

  const handleSaveName = () => {
    if (tempName.trim()) setDeviceName(tempName);
    setIsEditing(false);
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => setIsUpdating(false), 3000);
  };

  const handleFind = () => {
    setIsFinding(true);
    setTimeout(() => setIsFinding(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 pb-24 pt-4">
       {/* Header with Image */}
       <div className="relative flex flex-col items-center justify-center pt-4 pb-8">
          <div className="w-64 h-64 flex items-center justify-center relative z-10">
            <SmartImage 
              src={BandImage} 
              alt="Device" 
              className="text-[10rem] filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_30px_rgba(99,102,241,0.2)]" 
            />
          </div>
          
          <div className="flex items-center gap-3 mt-6">
            {isEditing ? (
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-zinc-900 p-2 rounded-xl">
                <input 
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="bg-transparent border-none outline-none font-black text-xl text-slate-900 dark:text-white w-40 text-center"
                  autoFocus
                />
                <button onClick={handleSaveName} className="p-2 bg-emerald-500 rounded-lg text-white"><Check className="w-4 h-4" /></button>
                <button onClick={() => setIsEditing(false)} className="p-2 bg-slate-300 dark:bg-zinc-700 rounded-lg text-slate-600"><X className="w-4 h-4" /></button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{deviceName}</h2>
                <button onClick={() => { setTempName(deviceName); setIsEditing(true); }} className="p-2 bg-slate-100 dark:bg-zinc-900 rounded-full text-slate-400 hover:text-indigo-500 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mt-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <Bluetooth className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Connected</span>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-zinc-900 rounded-full">
                <Battery className="w-3 h-3 text-slate-500" />
                <span className="text-[10px] font-black text-slate-600 dark:text-zinc-400 uppercase tracking-widest">88%</span>
             </div>
          </div>
       </div>

       {/* Controls */}
       <div className="grid grid-cols-1 gap-4">
          {/* Vibration */}
          <div className="p-6 bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-[2.5rem] shadow-sm">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                   <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl text-indigo-500"><Volume2 className="w-6 h-6" /></div>
                   <div>
                      <p className="font-black text-slate-900 dark:text-white">Haptic Strength</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vibration Intensity</p>
                   </div>
                </div>
                <span className="font-black text-indigo-500">{vibration}%</span>
             </div>
             <input type="range" min="0" max="100" value={vibration} onChange={(e) => setVibration(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 dark:bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
          </div>

          {/* Actions Grid */}
          <div className="grid grid-cols-2 gap-4">
             <button onClick={() => setAutoSync(!autoSync)} className={`p-6 rounded-[2.5rem] border-2 transition-all text-left ${autoSync ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white dark:bg-zinc-950 border-slate-100 dark:border-zinc-900'}`}>
                <RefreshCw className={`w-8 h-8 mb-4 ${autoSync ? 'text-white animate-spin-slow' : 'text-emerald-500'}`} />
                <p className={`font-black ${autoSync ? 'text-white' : 'text-slate-900 dark:text-white'}`}>Auto Sync</p>
                <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${autoSync ? 'text-emerald-100' : 'text-slate-400'}`}>{autoSync ? 'Enabled' : 'Disabled'}</p>
             </button>

             <button onClick={handleFind} className="p-6 bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-[2.5rem] text-left hover:border-indigo-500 transition-all group">
                <Search className={`w-8 h-8 mb-4 text-indigo-500 ${isFinding ? 'animate-ping' : ''}`} />
                <p className="font-black text-slate-900 dark:text-white">Find Device</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{isFinding ? 'Pinging...' : 'Play Sound'}</p>
             </button>
          </div>

          {/* Firmware */}
          <button onClick={handleUpdate} disabled={isUpdating} className="w-full p-6 bg-slate-900 dark:bg-zinc-800 text-white rounded-[2.5rem] flex items-center justify-between group shadow-xl">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-2xl"><Zap className={`w-6 h-6 ${isUpdating ? 'text-yellow-400' : 'text-white'}`} /></div>
                <div className="text-left">
                   <p className="font-black">Firmware Update</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isUpdating ? 'Downloading...' : 'v2.4.0 Available'}</p>
                </div>
             </div>
             {isUpdating ? <RefreshCw className="w-6 h-6 animate-spin text-slate-500" /> : <div className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest group-hover:bg-white/20 transition-colors">Update</div>}
          </button>
       </div>
    </div>
  );
};

export default MyDevice;
