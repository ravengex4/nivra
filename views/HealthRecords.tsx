
import React from 'react';
import DashboardCard from '../components/DashboardCard';
import { FileText, Download, Pill, Activity, Clock, User as UserIcon, CheckCircle2, Search } from 'lucide-react';
import { SeizureLog, User, UserRole } from '../types';

const mockHistory: SeizureLog[] = [
  { id: '1', timestamp: '2023-10-24 14:30', duration: '2m 15s', severity: 'Moderate' },
  { id: '2', timestamp: '2023-10-21 09:12', duration: '1m 05s', severity: 'Mild' },
  { id: '3', timestamp: '2023-10-15 22:45', duration: '3m 10s', severity: 'Severe' },
  { id: '4', timestamp: '2023-10-10 11:20', duration: '0m 45s', severity: 'Mild' },
  { id: '5', timestamp: '2023-10-02 03:15', duration: '1m 55s', severity: 'Moderate' },
];

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
  { id: '6', name: 'Emily Chen', treatmentDate: 'Sep 25, 2023' },
  { id: '7', name: 'Marcus Brown', treatmentDate: 'Sep 20, 2023' },
];

interface Props {
  user?: User;
}

const HealthRecords: React.FC<Props> = ({ user }) => {
  const isDoctor = user?.role === UserRole.DOCTOR;

  if (isDoctor) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 pb-12 pt-4">
        <DashboardCard title="Patient Central Log" icon={<Clock className="w-5 h-5" />}>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search patients by name or ID..."
              className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-zinc-900 rounded-[2rem] border-none outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-bold dark:text-white shadow-inner"
            />
          </div>

          <div className="space-y-3">
            {mockPreviousPatients.map((patient) => (
              <div 
                key={patient.id} 
                className="flex items-center justify-between p-6 bg-white dark:bg-zinc-900/20 border border-slate-100 dark:border-zinc-800 rounded-[2.5rem] group hover:border-indigo-500/30 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-slate-500 dark:text-zinc-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                    <UserIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-black text-slate-800 dark:text-zinc-200 text-lg">{patient.name}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Record Verified</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-1">Last Seen</p>
                  <p className="text-sm font-black text-slate-700 dark:text-zinc-300">{patient.treatmentDate}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 pb-12 pt-4">
      <div className="grid grid-cols-1 gap-6">
        <DashboardCard title="Active Medications" icon={<Pill className="w-5 h-5" />}>
          <div className="space-y-3">
            {[
              { name: 'Levetiracetam', dose: '500mg', freq: 'Twice daily', status: 'Active' },
              { name: 'Lamotrigine', dose: '100mg', freq: 'Once daily', status: 'Active' }
            ].map((med, idx) => (
              <div key={idx} className="p-5 bg-slate-50 dark:bg-zinc-900/50 rounded-3xl border border-slate-100 dark:border-zinc-800 flex justify-between items-center shadow-sm">
                <div>
                  <p className="font-black text-slate-800 dark:text-zinc-200 text-lg">{med.name}</p>
                  <p className="text-xs font-bold text-slate-500 dark:text-zinc-500 mt-1 uppercase tracking-wide">{med.dose} • {med.freq}</p>
                </div>
                <span className="text-[10px] font-black text-emerald-500 uppercase px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">{med.status}</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="History of Attacks" icon={<Clock className="w-5 h-5" />}>
          <div className="space-y-4">
            {mockHistory.map(log => (
              <div key={log.id} className="flex items-center justify-between p-5 border border-slate-100 dark:border-zinc-900 rounded-[2.5rem] bg-white dark:bg-black/20 shadow-sm transition-transform hover:scale-[1.01]">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${log.severity === 'Severe' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-500' : 'bg-slate-50 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400'}`}>
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-800 dark:text-zinc-200">{log.severity} Seizure</p>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-black uppercase tracking-widest mt-1">{log.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-500/20">{log.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Diagnostic Reports" icon={<FileText className="w-5 h-5" />}>
          <div className="space-y-3">
            {[
              { title: 'Brain MRI Scan', date: 'Oct 12, 2023', provider: 'City General' },
              { title: '24hr EEG Track', date: 'Sep 05, 2023', provider: 'Nivra Lab' }
            ].map((report, idx) => (
              <div key={idx} className="p-5 bg-white dark:bg-zinc-900/20 rounded-[2.5rem] border border-slate-100 dark:border-zinc-800 flex justify-between items-center group shadow-sm hover:border-indigo-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-slate-800 dark:text-zinc-200">{report.title}</p>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mt-1">{report.date} • {report.provider}</p>
                  </div>
                </div>
                <button className="p-3 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-2xl transition-all">
                  <Download className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default HealthRecords;
