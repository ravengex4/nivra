
import React, { useState } from 'react';
import { User } from '../types';
import { Smartphone } from 'lucide-react';
import { TabType } from '../components/BottomNav';

interface PreviousPatient {
  id: string;
  name: string;
  treatmentDate: string;
}

const mockPreviousPatients: PreviousPatient[] = [
  { id: '1', name: 'Osman Ghani', treatmentDate: 'Oct 24, 2023' },
  { id: '2', name: 'Zahra Ahmed', treatmentDate: 'Oct 22, 2023' },
  { id: '3', name: 'John Doe', treatmentDate: 'Oct 15, 2023' },
  { id: '4', name: 'Ayesha Khan', treatmentDate: 'Oct 10, 2023' },
  { id: '5', name: 'Robert Smith', treatmentDate: 'Sep 28, 2023' },
];

const DoctorDashboard: React.FC<{ user: User; onTabChange?: (tab: TabType) => void }> = ({ user }) => {
  const [scanning, setScanning] = useState(false);
  const [patients, setPatients] = useState<PreviousPatient[]>(mockPreviousPatients);

  const simulateNFC = () => {
    setScanning(true);
    setTimeout(() => {
      const newPatient: PreviousPatient = {
        id: Math.random().toString(36).substr(2, 9),
        name: 'New Scanned Patient',
        treatmentDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      setPatients([newPatient, ...patients]);
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 pb-20">
      {/* Scan Section */}
      <div className="relative group">
        <div className={`p-16 rounded-[3rem] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center bg-white dark:bg-zinc-950/50 min-h-[500px] ${
          scanning 
            ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/5' 
            : 'border-slate-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-zinc-700 shadow-xl shadow-slate-100 dark:shadow-none'
        }`}>
          <div className={`p-10 rounded-[2.5rem] transition-all duration-700 ${
            scanning ? 'bg-indigo-500 scale-125 shadow-2xl shadow-indigo-500/40' : 'bg-slate-50 dark:bg-zinc-900 shadow-inner'
          }`}>
            <Smartphone className={`w-16 h-16 ${scanning ? 'text-white' : 'text-indigo-500'}`} />
          </div>
          <h3 className="mt-10 text-3xl font-black dark:text-white tracking-tight">
            {scanning ? 'Searching for Band...' : 'Ready to Sync'}
          </h3>
          <p className="text-slate-500 dark:text-zinc-500 text-center mt-4 max-w-xs text-sm font-bold tracking-wide">
            Place your mobile device near the Nivra Smart Band to automatically pull the patient's secure medical profile.
          </p>
          <button 
            onClick={simulateNFC}
            disabled={scanning}
            className="mt-12 px-12 py-5 bg-indigo-500 text-white rounded-[2rem] font-black shadow-2xl shadow-indigo-500/40 hover:bg-indigo-600 transition-all disabled:opacity-50 active:scale-95 flex items-center gap-3 text-lg"
          >
            {scanning ? (
              <>
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                Scanning NFC...
              </>
            ) : (
              'Initiate NFC Scan'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
