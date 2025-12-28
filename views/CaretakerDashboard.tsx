
import React, { useState } from 'react';
import { User } from '../types';
import DashboardCard from '../components/DashboardCard';
import { Phone, Heart, AlertCircle, History, X, Plus, Activity } from 'lucide-react';

interface Note {
  id: string;
  timestamp: string;
  text: string;
}

const CaretakerDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', timestamp: 'Today, 08:30 AM', text: 'Medication taken: Levetiracetam 500mg' },
    { id: '2', timestamp: 'Yesterday, 11:45 PM', text: 'Sleep tracking active - Normal heart rate variability' },
  ]);

  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateLabel = now.toDateString() === new Date().toDateString() ? 'Today' : now.toLocaleDateString();

    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: `${dateLabel}, ${timestamp}`,
      text: newNoteText,
    };

    setNotes([newNote, ...notes]);
    setNewNoteText('');
    setIsAddingNote(false);
  };

  return (
    <div className="space-y-8 pb-4">
      {/* Integrated Status Header */}
      <div className="pt-4 px-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-[2rem] bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 flex items-center justify-center shadow-sm">
                <Heart className="w-10 h-10 text-rose-500" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white dark:border-black shadow-sm"></div>
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Patient: Osman</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Live Status: Stable</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Black Status Boxes */}
            <div className="p-4 bg-black rounded-[2rem] border border-zinc-800 text-center min-w-[100px] shadow-xl shadow-black/10">
              <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Heart Rate</p>
              <p className="text-xl font-black text-white">74 <span className="text-[10px] opacity-40">BPM</span></p>
            </div>
            <div className="p-4 bg-black rounded-[2rem] border border-zinc-800 text-center min-w-[100px] shadow-xl shadow-black/10">
              <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Oxygen</p>
              <p className="text-xl font-black text-white">98 <span className="text-[10px] opacity-40">%</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Emergency Hub" icon={<AlertCircle className="w-5 h-5" />}>
          <div className="space-y-4">
            <button className="w-full py-5 bg-rose-500 text-white rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/30 active:scale-[0.98]">
              <Phone className="w-5 h-5" /> Call Dispatch
            </button>
            <div className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-zinc-900/50 rounded-2xl border border-slate-100 dark:border-zinc-800">
              <Activity className="w-4 h-4 text-slate-400" />
              <p className="text-[10px] text-slate-500 dark:text-zinc-500 font-black uppercase tracking-widest">Protocol: Direct Medical Connect</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Caretaker Log" icon={<History className="w-5 h-5" />}>
          <div className="space-y-3">
            <div className="max-h-56 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {notes.map(note => (
                <div key={note.id} className="p-4 bg-white dark:bg-zinc-900/50 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm">
                  <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-1">{note.timestamp}</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-zinc-300 leading-snug">{note.text}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setIsAddingNote(true)}
              className="w-full py-4 text-indigo-500 text-sm font-black mt-2 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-2xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <Plus className="w-4 h-4" /> Add Observation
            </button>
          </div>
        </DashboardCard>
      </div>

      {/* Add Note Modal */}
      {isAddingNote && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-white/20 dark:bg-black/40 backdrop-blur-md">
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-zinc-800 p-8 relative overflow-hidden">
            <button 
              onClick={() => setIsAddingNote(false)}
              className="absolute right-6 top-6 p-2 rounded-full hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-black dark:text-white tracking-tighter">Add Observation</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-500 mt-2 font-bold uppercase tracking-widest opacity-60">Log critical medical events</p>
            </div>

            <form onSubmit={handleAddNote} className="space-y-6">
              <textarea 
                value={newNoteText}
                onChange={e => setNewNoteText(e.target.value)}
                placeholder="Details of observation..."
                className="w-full h-40 px-6 py-5 bg-slate-50 dark:bg-zinc-900 border-2 border-transparent focus:border-indigo-500 rounded-[2.5rem] transition-all outline-none font-bold dark:text-white resize-none shadow-inner"
                autoFocus
              />
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsAddingNote(false)}
                  className="flex-1 py-5 bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 rounded-2xl font-black text-sm transition-all"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  disabled={!newNoteText.trim()}
                  className="flex-[2] py-5 px-8 bg-indigo-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-500/30 hover:bg-indigo-600 transition-all disabled:opacity-50"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaretakerDashboard;
