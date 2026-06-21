import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function Analytics() {
  const { analytics } = useAdmin();

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
          <h1 className="font-display text-2xl font-bold text-text-primary">Analytics</h1>
          <p className="text-text-secondary">Q4 2024</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#3B82F6] hover:bg-[#1D4ED8] text-white rounded-xl font-medium transition-colors mt-4 md:mt-0">
          <Download size={16} />
          Export PDF
        </button>
      </div>

      {/* Impact Summary */}
      <div className="bg-gradient-to-r from-[#3B82F6]/10 to-[#1D4ED8]/10 border border-[#3B82F6]/20 rounded-2xl p-8 mb-8">
        <h2 className="font-display font-bold text-xl text-text-primary mb-6">Impact Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-text-secondary text-sm uppercase tracking-wider mb-1">Saved from Scam Exposure</p>
            <p className="font-mono text-3xl font-bold text-[#3B82F6]">{analytics.scamAlertsSaved}</p>
            <p className="text-text-muted text-xs mt-1">Estimated</p>
          </div>
          <div>
            <p className="text-text-secondary text-sm uppercase tracking-wider mb-1">Gov Scheme Benefits Unlocked</p>
            <p className="font-mono text-3xl font-bold text-[#3B82F6]">{analytics.schemeValueUnlocked}</p>
            <p className="text-text-muted text-xs mt-1">Across {analytics.schemesUnlocked} users</p>
          </div>
          <div>
            <p className="text-text-secondary text-sm uppercase tracking-wider mb-1">Hidden Clauses Found</p>
            <p className="font-mono text-3xl font-bold text-[#3B82F6]">{analytics.hiddenClausesFlagged}</p>
            <p className="text-text-muted text-xs mt-1">Across {analytics.docsAnalysed} documents</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Avg Health Score by Month */}
        <div className="bg-white border border-border-light rounded-2xl p-6 shadow-card">
          <h3 className="font-display font-semibold text-text-primary mb-6">Avg Health Score — Monthly</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.avgScoreByMonth}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={{ stroke: '#E2E8F0' }} />
                <YAxis domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 12 }} axisLine={{ stroke: '#E2E8F0' }} />
                <Tooltip
                  contentStyle={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    padding: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3B82F6"
                  strokeWidth={4}
                  dot={{ r: 6, fill: '#3B82F6' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scam Type Breakdown */}
        <div className="bg-white border border-border-light rounded-2xl p-6 shadow-card">
          <h3 className="font-display font-semibold text-text-primary mb-6">Scam Type Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.scamTypeBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={true} vertical={false} />
                <XAxis type="number" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={{ stroke: '#E2E8F0' }} />
                <YAxis
                  dataKey="type"
                  type="category"
                  tick={{ fill: '#64748B', fontSize: 12, width: 120 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  width={140}
                />
                <Tooltip
                  contentStyle={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    padding: '12px'
                  }}
                  formatter={(value, name) => [`${value}%`, 'Percentage']}
                />
                <Bar dataKey="pct" fill="#3B82F6" radius={[0, 8, 8, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Schemes */}
      <div className="bg-white border border-border-light rounded-2xl p-6 shadow-card">
        <h3 className="font-display font-semibold text-text-primary mb-6">Top Schemes Unlocked</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analytics.topSchemesUnlocked.map((scheme, i) => (
            <div key={i} className="p-4 bg-[#F8FAFC] border border-border-light rounded-xl">
              <p className="font-semibold text-text-primary">{scheme.name}</p>
              <p className="font-mono text-2xl font-bold text-[#3B82F6] my-1">{scheme.count}</p>
              <p className="text-text-muted text-xs">{scheme.valuePerUser}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
