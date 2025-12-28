
import React, { useState, useEffect } from 'react';
import { UserRole, User } from '../types';
import { Smartphone, Shield, ArrowRight, CheckCircle2, ChevronDown, Search, Loader2 } from 'lucide-react';

interface Props {
  onLogin: (user: User) => void;
}

interface Country {
  name: string;
  code: string;
  flag: string;
  iso: string;
}

const countries: Country[] = [
  { name: 'United States', code: '+1', flag: '🇺🇸', iso: 'US' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧', iso: 'GB' },
  { name: 'Pakistan', code: '+92', flag: '🇵🇰', iso: 'PK' },
  { name: 'India', code: '+91', flag: '🇮🇳', iso: 'IN' },
  { name: 'Canada', code: '+1', flag: '🇨🇦', iso: 'CA' },
  { name: 'Germany', code: '+49', flag: '🇩🇪', iso: 'DE' },
  { name: 'Australia', code: '+61', flag: '🇦🇺', iso: 'AU' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪', iso: 'AE' },
];

const Auth: React.FC<Props> = ({ onLogin }) => {
  const [step, setStep] = useState<'ROLE' | 'PHONE'>('ROLE');
  const [role, setRole] = useState<UserRole | null>(null);
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep('PHONE');
    setError(null);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 7) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsProcessing(true);
    setError(null);
    
    // Simulate a secure connection/authentication check
    setTimeout(() => {
      setIsProcessing(false);
      onLogin({
        id: 'user1',
        name: role === UserRole.DOCTOR ? 'Sarah Miller' : 'Osman Ghani',
        role: role!,
        phone: `${selectedCountry.code}${phone}`,
      });
    }, 1500);
  };

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.code.includes(searchQuery)
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-black">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-500 rounded-3xl mb-6 shadow-xl shadow-indigo-500/20">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Nivra</h1>
          <p className="text-slate-500 dark:text-zinc-500 mt-2 font-medium">Advanced Seizure Prediction System</p>
        </div>

        <div className="glass bg-white/80 dark:bg-zinc-950 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-zinc-800 relative min-h-[400px]">
          {error && (
            <div className="absolute top-4 left-8 right-8 bg-rose-50 dark:bg-rose-500/10 text-rose-500 text-xs font-bold p-3 rounded-xl text-center animate-in slide-in-from-top-2 z-10">
              {error}
            </div>
          )}

          {step === 'ROLE' && (
            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-bold mb-6 text-center dark:text-zinc-200">I am a...</h2>
              <button 
                onClick={() => handleRoleSelect(UserRole.PATIENT)}
                className="w-full p-4 border-2 border-slate-50 dark:border-zinc-900 rounded-2xl flex items-center justify-between hover:border-indigo-500 transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold dark:text-zinc-200">Patient</p>
                    <p className="text-xs text-slate-500 dark:text-zinc-500">Wear the Smart Band</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500" />
              </button>

              <button 
                onClick={() => handleRoleSelect(UserRole.CARETAKER)}
                className="w-full p-4 border-2 border-slate-50 dark:border-zinc-900 rounded-2xl flex items-center justify-between hover:border-emerald-500 transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold dark:text-zinc-200">Caretaker</p>
                    <p className="text-xs text-slate-500 dark:text-zinc-500">Monitor a loved one</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500" />
              </button>

              <button 
                onClick={() => handleRoleSelect(UserRole.DOCTOR)}
                className="w-full p-4 border-2 border-slate-50 dark:border-zinc-900 rounded-2xl flex items-center justify-between hover:border-purple-500 transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold dark:text-zinc-200">Doctor</p>
                    <p className="text-xs text-slate-500 dark:text-zinc-500">Access medical records</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-purple-500" />
              </button>
            </div>
          )}

          {step === 'PHONE' && (
            <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-right-8">
              <div className="text-center mb-6">
                <button type="button" onClick={() => setStep('ROLE')} className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Back</button>
                <h2 className="text-2xl font-bold mt-2 dark:text-zinc-200">Welcome back</h2>
                <p className="text-sm text-slate-500 dark:text-zinc-500 mt-2">Enter your phone number to access your account.</p>
              </div>
              
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => setShowCountryPicker(true)}
                      className="h-full flex items-center justify-center gap-2 px-4 py-4 bg-slate-50 dark:bg-zinc-900 border-2 border-transparent hover:border-slate-200 dark:hover:border-zinc-800 rounded-2xl transition-all font-bold dark:text-white whitespace-nowrap"
                    >
                      <span>{selectedCountry.flag}</span>
                      <span>{selectedCountry.code}</span>
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </button>
                  </div>
                  <div className="relative flex-1">
                    <input 
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      disabled={isProcessing}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-4 bg-slate-50 dark:bg-zinc-900 border-2 border-transparent focus:border-indigo-500 rounded-2xl transition-all outline-none font-medium dark:text-white"
                      autoFocus
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-indigo-500 text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/30 hover:bg-indigo-600 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              {showCountryPicker && (
                <div className="absolute inset-0 z-50 bg-white dark:bg-zinc-950 rounded-[2.5rem] flex flex-col p-6 animate-in fade-in slide-in-from-bottom-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg dark:text-white">Select Country</h3>
                    <button onClick={() => setShowCountryPicker(false)} className="text-indigo-500 font-bold">Close</button>
                  </div>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Search country..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm dark:text-white"
                      autoFocus
                    />
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
                    {filteredCountries.map(country => (
                      <button
                        key={country.iso}
                        onClick={() => {
                          setSelectedCountry(country);
                          setShowCountryPicker(false);
                          setSearchQuery('');
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                          selectedCountry.iso === country.iso 
                            ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600' 
                            : 'hover:bg-slate-50 dark:hover:bg-zinc-900 dark:text-zinc-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{country.flag}</span>
                          <span className="font-medium">{country.name}</span>
                        </div>
                        <span className="text-xs font-bold opacity-60">{country.code}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
