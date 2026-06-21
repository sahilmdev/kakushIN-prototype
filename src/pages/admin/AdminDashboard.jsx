import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import HealthScoreRing from '../../components/HealthScoreRing';

const getScoreColor = (score) => {
  if (score < 40) return { bg: 'bg-[#DC2626]', text: 'text-[#DC2626]', bar: '#DC2626' };
  if (score < 60) return { bg: 'bg-[#F59E0B]', text: 'text-[#F59E0B]', bar: '#F59E0B' };
  if (score < 80) return { bg: 'bg-[#3B82F6]', text: 'text-[#3B82F6]', bar: '#3B82F6' };
  return { bg: 'bg-[#10B981]', text: 'text-[#10B981]', bar: '#10B981' };
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { analytics, users } = useAdmin();
  const flaggedUsers = users.filter(u => u.flagged);
  const usersNeedingAttention = users.filter(u => u.riskLevel === 'high' || u.flagged);

  const statCards = [
    { label: 'Total Users', value: analytics.overview.totalUsers, delta: '+18', isPositive: true, suffix: 'wk' },
    { label: 'Active This Week', value: analytics.overview.activeThisWeek, delta: '+11', isPositive: true, suffix: 'mo' },
    { label: 'Avg Health Score', value: analytics.overview.avgHealthScore, delta: analytics.overview.avgHealthScoreChange, isPositive: true },
    { label: 'Scam Alerts', value: analytics.overview.scamAlertsTotal, subValue: analytics.overview.scamAlertsSaved },
    { label: 'Schemes Unlocked', value: analytics.overview.schemesUnlocked, subValue: analytics.overview.schemeValueUnlocked },
    { label: 'Users Flagged', value: flaggedUsers.length, subValue: 'needs attn' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="p-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary">Good morning, Admin</h1>
          <p className="text-text-secondary mt-1">Zomato Partner Welfare · 847 users · Last updated: 10 June 2026</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border border-border-light rounded-2xl p-5 shadow-card"
          >
            <p className="text-text-secondary text-xs font-body uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="font-mono text-2xl font-semibold text-text-primary">{stat.value.toLocaleString?.() || stat.value}</p>
            {stat.delta && (
              <p className={`text-xs mt-1 flex items-center gap-1 ${stat.isPositive ? 'text-success' : 'text-danger'}`}>
                {stat.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.delta} {stat.suffix}
              </p>
            )}
            {stat.subValue && (
              <p className="text-text-secondary text-xs mt-1">{stat.subValue}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Top Row: Health Distribution + Weekly Active */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-border-light rounded-2xl p-6 shadow-card">
          <h3 className="font-display font-semibold text-text-primary mb-4">Health Score Distribution</h3>
          <div className="space-y-3">
            {analytics.healthScoreDistribution.map((item, i) => {
              const colors = [
                { bar: '#DC2626', label: 'Critical' },
                { bar: '#F59E0B', label: 'At Risk' },
                { bar: '#FACC15', label: 'Developing' },
                { bar: '#3B82F6', label: 'Stable' },
                { bar: '#10B981', label: 'Strong' }
              ][i];
              return (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text-secondary">{item.label}</span>
                    <span className="font-mono text-text-primary">{item.count} ({item.pct}%)</span>
                  </div>
                  <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${item.pct}%`, backgroundColor: colors.bar }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-border-light rounded-2xl p-6 shadow-card">
          <h3 className="font-display font-semibold text-text-primary mb-4">Weekly Active Users</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.weeklyActiveUsers}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={{ stroke: '#E2E8F0' }} />
                <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={{ stroke: '#E2E8F0' }} />
                <Tooltip
                  contentStyle={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    padding: '12px',
                  }}
                />
                <Area type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Users Needing Attention + Top Scam Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-border-light rounded-2xl p-6 shadow-card">
          <h3 className="font-display font-semibold text-text-primary mb-4">Users Needing Attention</h3>
          <div className="space-y-4">
            {usersNeedingAttention.slice(0, 3).map((user) => {
              const color = getScoreColor(user.healthScore);
              return (
                <div
                  key={user.id}
                  onClick={() => navigate(`/admin/users/${user.id}`)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all hover:border-[#3B82F6] ${
                    user.flagged || user.riskLevel === 'high' ? 'bg-[#FEF2F2] border-[#FECACA]' : 'bg-[#FFFBEB] border-[#FDE68A]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: color.bar }}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">{user.name}</h4>
                        <p className="text-sm text-text-secondary">{user.occupation} · {user.city}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className={`font-mono font-bold ${color.text}`}>{user.healthScore}</span>
                        <span className={`text-sm ${user.healthScoreDelta.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                          {user.healthScoreDelta}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-text-secondary">
                    {user.debtCount > 0 && <span>{user.debtCount} active debts · </span>}
                    {user.emergencyFundPct === 0 && <span>0% emergency fund</span>}
                    {user.emergencyFundPct > 0 && <span>{user.emergencyFundPct}% emergency fund</span>}
                  </div>
                  <button className="mt-2 text-[#3B82F6] text-xs font-semibold hover:underline">View Profile →</button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-border-light rounded-2xl p-6 shadow-card">
          <h3 className="font-display font-semibold text-text-primary mb-4">Top Scam Types This Month</h3>
          <div className="space-y-4">
            {analytics.scamTypeBreakdown.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text-primary font-medium">{item.type}</span>
                  <span className="font-mono text-text-secondary">{item.pct}%</span>
                </div>
                <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#3B82F6] rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/admin/scam-reports')}
            className="mt-6 text-[#3B82F6] text-sm font-semibold hover:underline"
          >
            View Full Report →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
