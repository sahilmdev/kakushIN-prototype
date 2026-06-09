import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, ShieldAlert, TrendingUp, Landmark, FileText, Mic } from 'lucide-react';
import { useHealthScoreContext } from '../context/HealthScoreContext';
import rajeshData from '../data/rajesh.json';

const TABS = [
  { path: '/dashboard', icon: Home, labelKey: 'nav.home' },
  { path: '/scam', icon: ShieldAlert, labelKey: 'nav.scam' },
  { path: '/twin', icon: TrendingUp, labelKey: 'nav.twin' },
  { path: '/schemes', icon: Landmark, labelKey: 'nav.schemes', badge: 3 },
  { path: '/docs', icon: FileText, labelKey: 'nav.docs' },
];

export default function NavBar() {
  const { t } = useTranslation();
  const { score } = useHealthScoreContext();
  const { profile } = rajeshData;

  return (
    <aside className="w-60 flex-shrink-0 bg-sidebar flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Branding */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Landmark className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-lg leading-tight tracking-tight">
              ArthSaathi
            </h1>
            <p className="text-slate-500 text-[10px] font-body uppercase tracking-widest mt-0.5">
              अर्थसाथी
            </p>
          </div>
        </div>
      </div>

      {/* User Card & Health Score */}
      <div className="px-3 mb-6">
        <div className="p-4 rounded-2xl bg-sidebar-hover border border-white/5 shadow-raised">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
              {profile.name.charAt(0)}
            </div>
            <div>
              <p className="text-white text-sm font-medium leading-tight">{profile.name}</p>
              <p className="text-slate-500 text-[11px] mt-0.5">{profile.occupation}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider font-body font-semibold">
                Health Score
              </span>
              <span className="text-white font-mono text-xs font-bold">{score}</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-700"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <p className="text-slate-600 text-[11px] uppercase tracking-widest px-3 mb-2 font-bold">
          Navigation
        </p>
        <div className="space-y-1">
          {TABS.map(({ path, icon: Icon, labelKey, badge }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-[13px] font-medium font-body ${
                  isActive
                    ? 'bg-sidebar-active text-white shadow-blue'
                    : 'text-slate-400 hover:bg-sidebar-hover hover:text-slate-200'
                }`
              }
            >
              <Icon size={18} />
              <span className="flex-1">{t(labelKey)}</span>
              {badge && (
                <span className="bg-danger text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Voice Footer */}
      <div className="p-4 mt-auto">
        <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Mic size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-slate-300 text-[11px] font-semibold leading-none">Voice Nav</p>
            <p className="text-slate-500 text-[10px] mt-1 italic leading-none">"Say a page name"</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
