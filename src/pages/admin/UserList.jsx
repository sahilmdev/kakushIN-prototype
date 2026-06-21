import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const getScoreColor = (score) => {
  if (score < 40) return 'bg-[#DC2626] text-white';
  if (score < 60) return 'bg-[#F59E0B] text-white';
  if (score < 80) return 'bg-[#3B82F6] text-white';
  return 'bg-[#10B981] text-white';
};

export default function UserList() {
  const navigate = useNavigate();
  const { users } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || user.riskLevel === riskFilter;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="p-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-text-primary">Users (847)</h1>
        <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:border-[#3B82F6]"
          >
            <option value="all">All</option>
            <option value="improving">Improving</option>
            <option value="declining">Declining</option>
            <option value="stable">Stable</option>
            <option value="new">New</option>
          </select>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:border-[#3B82F6]"
          >
            <option value="all">All Risk</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-border-light rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">City</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Score</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Change</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Risk</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className={`hover:bg-[#F8FAFC] transition-colors cursor-pointer ${
                    user.flagged ? 'bg-[#FEF2F2]' : ''
                  }`}
                  onClick={() => navigate(`/admin/users/${user.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.flagged && (
                        <span className="w-2 h-2 bg-[#DC2626] rounded-full" />
                      )}
                      <span className="font-medium text-text-primary">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{user.city}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getScoreColor(user.healthScore)}`}>
                      {user.healthScore}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-mono font-bold flex items-center gap-1 ${
                      user.healthScoreDelta.startsWith('+') ? 'text-success' : user.healthScoreDelta === '0' ? 'text-text-muted' : 'text-danger'
                    }`}>
                      {user.healthScoreDelta}
                      {user.healthScoreDelta.startsWith('+') ? <ArrowUpRight size={14} /> : user.healthScoreDelta !== '0' ? <ArrowDownRight size={14} /> : null}
                    </span>
                  </td>
                  <td className="px-6 py-4 capitalize text-text-secondary">{user.riskLevel}</td>
                  <td className="px-6 py-4 text-text-secondary">{user.lastActive}</td>
                  <td className="px-6 py-4">
                    <button className="text-[#3B82F6] text-sm font-semibold hover:underline">View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
