
import React, { useState, useEffect } from 'react';
import { 
  User, LogOut, Shield, Settings, Bell, CreditCard, ChevronRight, 
  Sun, Moon, ChevronLeft, Music, Palette, Fingerprint, Users, Share2, 
  Check, Phone, Key, Lock, Eye, Trash2, Smartphone, Download, Loader2,
  Sliders, Activity, RefreshCw, Zap, Plus, CreditCard as CardIcon, ExternalLink, Watch
} from 'lucide-react';
import { User as UserType } from '../types';
import { IMAGE_ASSETS } from '../assets/images';
import SmartImage from '../components/SmartImage';
import MyDevice from './Marketplace';

interface Props {
  user: UserType;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

type ProfileView = 'MENU' | 'NOTIFICATIONS' | 'SECURITY' | 'BILLING' | 'DEVICE';

const Profile: React.FC<Props> = ({ user, onLogout, isDarkMode, toggleTheme }) => {
  const [activeView, setActiveView] = useState<ProfileView>('MENU');
  
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.tab === 'profile') {
        setActiveView(event.state.subView || 'MENU');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view: ProfileView) => {
    setActiveView(view);
    window.history.pushState({ tab: 'profile', subView: view }, '', '');
  };

  const [selectedTone, setSelectedTone] = useState('Alert High');
  const [alertColor, setAlertColor] = useState('rose');
  const [testingNotification, setTestingNotification] = useState(false);
  
  const [biometrics, setBiometrics] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState('+1 555 0123');
  const [isExporting, setIsExporting] = useState(false);

  const [plan, setPlan] = useState<'FREE' | 'PRO' | 'FAMILY'>('PRO');
  const [isUpgrading, setIsUpgrading] = useState(false);

  const tones = ['Default', 'Alert High', 'Soft Chime', 'Digital Pulse'];
  const colors = [
    { id: 'indigo', hex: 'bg-indigo-500' },
    { id: 'rose', hex: 'bg-rose-500' },
    { id: 'amber', hex: 'bg-amber-500' },
    { id: 'emerald', hex: 'bg-emerald-500' },
  ];

  const handleTestNotification = () => {
    setTestingNotification(true);
    setTimeout(() => setTestingNotification(false), 2000);
  };

  const handlePlanChange = (newPlan: 'FREE' | 'PRO' | 'FAMILY') => {
    setIsUpgrading(true);
    setTimeout(() => {
      setPlan(newPlan);
      setIsUpgrading(false);
    }, 1500);
  };

  const renderHeader = (title: string) => (
    <div className="flex items-center gap-4 mb-4">
      <button 
        onClick={() => window.history.back()}
        className="p-3 bg-slate-50 dark:bg-zinc-900 rounded-2xl text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <h2 className="text-2xl font-black dark:text-white">{title}</h2>
    </div>
  );

  if (activeView === 'DEVICE') {
    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 pb-24">
        {renderHeader('Device Settings')}
        <MyDevice />
      </div>
    );
  }

  if (activeView === 'BILLING') {
    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 pb-24">
        {renderHeader('Billing & Plans')}
        <div className="space-y-4">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-500/30 relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
             <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Current Active Subscription</p>
             <h3 className="text-3xl font-black mb-6">Nivra {plan} Plan</h3>
             <div className="flex items-baseline gap-2 mb-8">
               <span className="text-4xl font-black">{plan === 'FREE' ? '$0' : plan === 'PRO' ? '$12' : '$29'}</span>
               <span className="text-sm font-bold opacity-70">/ month</span>
             </div>
             <div className="flex gap-2">
               <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-wider">Next bill: Nov 24</span>
               <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-wider">Visa •••• 4242</span>
             </div>
          </div>

          <div className="bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-[2.5rem] p-6 space-y-4 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest px-2 mb-2">Available Plans</h4>
            {(['FREE', 'PRO', 'FAMILY'] as const).map((p) => (
              <button
                key={p}
                disabled={plan === p || isUpgrading}
                onClick={() => handlePlanChange(p)}
                className={`w-full flex items-center justify-between p-5 rounded-[2rem] border-2 transition-all ${
                  plan === p 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/5' 
                  : 'border-slate-50 dark:border-zinc-900 hover:border-slate-200 dark:hover:border-zinc-800'
                }`}
              >
                <div className="text-left">
                  <p className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{p} Tier</p>
                  <p className="text-xs text-slate-500 dark:text-zinc-500 font-bold">{p === 'FAMILY' ? 'Up to 5 members' : p === 'PRO' ? 'Standard 1-user' : 'Limited stats'}</p>
                </div>
                {plan === p ? (
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900/50">Current</span>
                ) : (
                  <span className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Select</span>
                )}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-[2.5rem] p-6 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest px-2 mb-4">Payment Methods</h4>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-zinc-900 rounded-2xl mb-3">
              <div className="flex items-center gap-3">
                <CardIcon className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-black text-slate-700 dark:text-zinc-200">Visa ending in 4242</span>
              </div>
              <span className="text-[10px] font-black text-emerald-500 uppercase">Primary</span>
            </div>
            <button className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center gap-2 text-slate-400 dark:text-zinc-500 hover:text-indigo-500 hover:border-indigo-500 transition-all font-black text-xs uppercase tracking-widest">
              <Plus className="w-4 h-4" /> Add Payment Method
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'NOTIFICATIONS') {
    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 pb-24">
        {renderHeader('Notifications')}
        <div className="bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-[2.5rem] p-8 space-y-10 shadow-xl">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-indigo-500">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl">
                <Music className="w-5 h-5" />
              </div>
              <h3 className="font-black text-xs uppercase tracking-[0.2em]">Alert Tone</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {tones.map(tone => (
                <button 
                  key={tone}
                  onClick={() => setSelectedTone(tone)}
                  className={`flex items-center justify-between p-5 rounded-3xl border-2 transition-all duration-300 ${
                    selectedTone === tone 
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' 
                    : 'border-transparent bg-slate-50 dark:bg-zinc-900/50'
                  }`}
                >
                  <span className={`font-black ${selectedTone === tone ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-zinc-400'}`}>
                    {tone}
                  </span>
                  {selectedTone === tone && <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center"><Check className="w-4 h-4 text-white" /></div>}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-rose-500">
              <div className="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-xl">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="font-black text-xs uppercase tracking-[0.2em]">Alert Theme Color</h3>
            </div>
            <div className="flex flex-wrap gap-4 p-2">
              {colors.map(color => (
                <button
                  key={color.id}
                  onClick={() => setAlertColor(color.id)}
                  className={`w-14 h-14 rounded-3xl ${color.hex} flex items-center justify-center transition-all duration-500 hover:scale-110 ${
                    alertColor === color.id ? 'ring-[6px] ring-offset-4 ring-indigo-500 dark:ring-offset-black scale-110 shadow-2xl' : 'opacity-40 scale-100'
                  }`}
                >
                  {alertColor === color.id && <Check className="w-7 h-7 text-white" />}
                </button>
              ))}
            </div>
          </section>

          <button 
            onClick={handleTestNotification}
            disabled={testingNotification}
            className="w-full py-5 bg-indigo-500 text-white rounded-[2rem] font-black shadow-2xl shadow-indigo-500/30 hover:bg-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            {testingNotification ? <Loader2 className="w-5 h-5 animate-spin" /> : <Bell className="w-5 h-5" />}
            {testingNotification ? 'Sending Test...' : 'Send Test Notification'}
          </button>
        </div>
      </div>
    );
  }

  if (activeView === 'SECURITY') {
    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 pb-24">
        {renderHeader('Security & Privacy')}
        <div className="space-y-4">
          <div className="p-6 bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-[2.5rem] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-2xl">
                <Fingerprint className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black dark:text-zinc-200">Biometric Login</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">FaceID / Fingerprint</p>
              </div>
            </div>
            <button 
              onClick={() => setBiometrics(!biometrics)}
              className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${biometrics ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-zinc-800'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-sm ${biometrics ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="p-6 bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-[2.5rem] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-500/10 text-purple-500 rounded-2xl">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black dark:text-zinc-200">2-Factor Auth</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">SMS Verification Code</p>
              </div>
            </div>
            <button 
              onClick={() => setTwoFactor(!twoFactor)}
              className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${twoFactor ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-zinc-800'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-sm ${twoFactor ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="p-6 bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-[2.5rem] space-y-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-2xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black dark:text-zinc-200">Emergency Contact</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Linked Alert Recipient</p>
              </div>
            </div>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-zinc-900 rounded-2xl font-black dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-[2.5rem] space-y-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-2xl">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black dark:text-zinc-200">Privacy & Data Audit</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Audit History</p>
              </div>
            </div>
            <button 
              onClick={() => setIsExporting(true)}
              className="w-full py-4 bg-slate-50 dark:bg-zinc-900 rounded-2xl font-black text-sm flex items-center justify-center gap-2"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isExporting ? 'Exporting...' : 'Download My Privacy Report'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 pb-24">
      <div className="flex flex-col items-center pt-8">
        <div className="w-28 h-28 rounded-[2.5rem] bg-indigo-500 p-1.5 mb-6 shadow-2xl rotate-3">
          <div className="w-full h-full rounded-[2.2rem] bg-white dark:bg-black flex items-center justify-center -rotate-3 overflow-hidden border-2 border-transparent">
            <SmartImage 
              src={user.avatar || IMAGE_ASSETS.profile.avatar_default} 
              alt={user.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{user.name}</h2>
        <div className="flex flex-col items-center gap-2 mt-2">
          <p className="text-indigo-500 font-black text-[10px] uppercase tracking-[0.2em] bg-indigo-50 dark:bg-indigo-500/10 px-6 py-2 rounded-full border border-indigo-100 dark:border-indigo-500/20">
            {user.role} Pro Account
          </p>
          <p className="text-slate-400 text-xs font-bold tracking-tight flex items-center gap-2 opacity-60">
            <Smartphone className="w-3.5 h-3.5" /> {user.phone}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={toggleTheme}
          className="w-full flex items-center justify-between p-6 bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-[2.5rem] hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all group shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900 group-hover:scale-110 transition-transform ${isDarkMode ? 'text-amber-500' : 'text-slate-500'}`}>
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </div>
            <div>
              <p className="font-black text-slate-700 dark:text-zinc-200">System Appearance</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</p>
            </div>
          </div>
          <div className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-zinc-800'}`}>
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-sm ${isDarkMode ? 'left-7' : 'left-1'}`} />
          </div>
        </button>

        <button 
          onClick={() => navigateTo('DEVICE')}
          className="w-full flex items-center justify-between p-6 bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-[2.5rem] hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all group shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900 group-hover:scale-110 transition-transform text-indigo-500">
              <Watch className="w-6 h-6" />
            </div>
            <span className="font-black text-slate-700 dark:text-zinc-200">Device Settings</span>
          </div>
          <ChevronRight className="w-6 h-6 text-slate-300" />
        </button>

        <button 
          onClick={() => navigateTo('SECURITY')}
          className="w-full flex items-center justify-between p-6 bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-[2.5rem] hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all group shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900 group-hover:scale-110 transition-transform text-emerald-500">
              <Shield className="w-6 h-6" />
            </div>
            <span className="font-black text-slate-700 dark:text-zinc-200">Security & Privacy</span>
          </div>
          <ChevronRight className="w-6 h-6 text-slate-300" />
        </button>

        <button 
          onClick={() => navigateTo('NOTIFICATIONS')}
          className="w-full flex items-center justify-between p-6 bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-[2.5rem] hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all group shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900 group-hover:scale-110 transition-transform text-rose-500">
              <Bell className="w-6 h-6" />
            </div>
            <span className="font-black text-slate-700 dark:text-zinc-200">Notifications</span>
          </div>
          <ChevronRight className="w-6 h-6 text-slate-300" />
        </button>

        <button 
          onClick={() => navigateTo('BILLING')}
          className="w-full flex items-center justify-between p-6 bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-900 rounded-[2.5rem] hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all group shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900 group-hover:scale-110 transition-transform text-emerald-500">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="font-black text-slate-700 dark:text-zinc-200">Billing & Subscriptions</span>
          </div>
          <ChevronRight className="w-6 h-6 text-slate-300" />
        </button>
      </div>

      <button 
        onClick={onLogout}
        className="w-full py-6 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-[2.5rem] font-black flex items-center justify-center gap-3 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all border border-rose-100 dark:border-transparent active:scale-[0.98] shadow-sm"
      >
        <LogOut className="w-5 h-5" /> Logout
      </button>
    </div>
  );
};

export default Profile;
