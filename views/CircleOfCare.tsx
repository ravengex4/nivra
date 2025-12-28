import React, { useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import { Phone, User, Plus, Users, Stethoscope, Shield } from 'lucide-react';

interface Caretaker {
  id: string;
  name: string;
  role: string;
}

const CircleOfCare: React.FC = () => {
  const [caretakers, setCaretakers] = useState<Caretaker[]>([
    { id: '1', name: 'John Doe', role: 'Husband • Emergency Contact' }
  ]);

  const handleImportContact = async () => {
    try {
      // @ts-ignore - Contact Picker API is experimental
      if ('contacts' in navigator && 'ContactsManager' in window) {
        const props = ['name', 'tel'];
        const opts = { multiple: false };
        // @ts-ignore
        const contacts = await navigator.contacts.select(props, opts);
        
        if (contacts.length) {
          const contact = contacts[0];
          setCaretakers(prev => [...prev, {
            id: Math.random().toString(36).substr(2, 9),
            name: contact.name[0],
            role: 'Imported Contact'
          }]);
        }
      } else {
        // Fallback for desktop/unsupported browsers
        const name = window.prompt("Enter Caretaker Name:");
        if (name) {
          setCaretakers(prev => [...prev, {
            id: Math.random().toString(36).substr(2, 9),
            name: name,
            role: 'Imported Contact'
          }]);
        }
      }
    } catch (ex) {
      console.error("Error importing contact:", ex);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 pb-24 pt-4">
       {/* Header */}
       <div className="flex flex-col items-center justify-center pt-4 pb-8 text-center">
          <div className="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 rounded-[2rem] flex items-center justify-center mb-4 text-rose-500">
            <Users className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Circle of Care</h2>
          <p className="text-slate-500 dark:text-zinc-500 text-sm font-bold mt-2">Your trusted medical network</p>
       </div>

       <div className="grid grid-cols-1 gap-4">
          {/* Doctor Card */}
          <DashboardCard title="Primary Physician" icon={<Stethoscope className="w-5 h-5" />}>
             <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500">
                      <User className="w-7 h-7" />
                   </div>
                   <div>
                      <p className="font-black text-slate-900 dark:text-white text-lg">Dr. Sarah Miller</p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Neurologist</p>
                   </div>
                </div>
                <button className="p-3 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95">
                   <Phone className="w-5 h-5" />
                </button>
             </div>
          </DashboardCard>

          {/* Caretakers List */}
          {caretakers.map((caretaker, index) => (
            <DashboardCard key={caretaker.id} title={index === 0 ? "Primary Caretaker" : "Caretaker"} icon={<Shield className="w-5 h-5" />}>
               <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 bg-rose-50 dark:bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500">
                        <User className="w-7 h-7" />
                     </div>
                     <div>
                        <p className="font-black text-slate-900 dark:text-white text-lg">{caretaker.name}</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{caretaker.role}</p>
                     </div>
                  </div>
                  <button className="p-3 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95">
                     <Phone className="w-5 h-5" />
                  </button>
               </div>
            </DashboardCard>
          ))}

          {/* Add New Button */}
          <button onClick={handleImportContact} className="w-full p-6 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-indigo-500 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all group">
             <div className="p-3 bg-slate-100 dark:bg-zinc-900 rounded-full group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <Plus className="w-6 h-6" />
             </div>
             <span className="font-black uppercase tracking-widest text-xs">Add New Caretaker</span>
          </button>
       </div>
    </div>
  );
};

export default CircleOfCare;