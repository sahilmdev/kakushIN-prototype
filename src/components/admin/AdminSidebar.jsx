import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  Landmark,
  FileText,
  BarChart3,
  ArrowLeft
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { scamReports, schemesDb } = useAdmin();
  const pendingScamReports = scamReports.filter(r => r.status === 'pending-review').length;
  const needsReviewSchemes = schemesDb.filter(s => s.status === 'needs-review').length;

  const navItems = [
    { path: '/admin/dashboard', label: 'FWM Dashboard', icon: LayoutDashboard },
    { path: '/admin/users', label: 'Users', icon: Users },
    { 
      path: '/admin/scam-reports', 
      label: 'Scam Reports', 
      icon: ShieldAlert, 
      badge: pendingScamReports 
    },
    { 
      path: '/admin/schemes', 
      label: 'Schemes DB', 
      icon: Landmark, 
      badge: needsReviewSchemes 
    },
    { path: '/admin/documents', label: 'Documents', icon: FileText },
    { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="w-full md:w-64 bg-[#1E293B] text-white p-6 flex flex-col h-full">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold">ArthSaathi</h1>
        <p className="text-slate-400 text-sm">Admin Portal</p>
      </div>

      <div className="bg-[#334155] rounded-xl p-4 mb-6">
        <p className="text-sm font-semibold">Zomato Partner Welfare</p>
        <p className="text-xs text-slate-400 mt-1">847 users · Q4 24</p>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Management</p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive ? 'bg-[#3B82F6] text-white' : 'text-slate-300 hover:bg-[#334155]'
              }`
            }
          >
            <item.icon size={18} />
            <span className="flex-1">{item.label}</span>
            {item.badge > 0 && (
              <span className="bg-[#DC2626] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-400 hover:text-white mt-6 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>← User App</span>
      </button>
    </div>
  );
}
