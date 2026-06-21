import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function ScamReports() {
  const navigate = useNavigate();
  const { scamReports, updateScamReportStatus, showToast } = useAdmin();
  const [filter, setFilter] = useState('all');

  const filteredReports = scamReports.filter(report => {
    if (filter === 'pending') return report.status === 'pending-review';
    if (filter === 'reviewed') return report.status !== 'pending-review';
    return true;
  });

  const handleConfirmScam = (reportId, communityMatches) => {
    updateScamReportStatus(reportId, 'reviewed-scam');
    showToast(`Added to community scam database. ${communityMatches} users will be warned.`);
  };

  const handleMarkSafe = (reportId) => {
    updateScamReportStatus(reportId, 'reviewed-safe');
    showToast('Marked as safe. Not added to warning list.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="p-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-text-primary">Scam Reports ({scamReports.length})</h1>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === 'pending' ? 'bg-[#DC2626] text-white' : 'bg-white border border-border-light text-text-secondary'
            }`}
          >
            Pending: {scamReports.filter(r => r.status === 'pending-review').length}
          </button>
          <button
            onClick={() => setFilter('reviewed')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === 'reviewed' ? 'bg-[#10B981] text-white' : 'bg-white border border-border-light text-text-secondary'
            }`}
          >
            Reviewed: {scamReports.filter(r => r.status !== 'pending-review').length}
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-[#3B82F6] text-white' : 'bg-white border border-border-light text-text-secondary'
            }`}
          >
            All
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className={`bg-white border border-border-light rounded-2xl p-6 shadow-card ${
              report.status !== 'pending-review' ? 'opacity-70' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {report.status === 'pending-review' && report.verdict === 'SCAM' && (
                  <div className="w-10 h-10 bg-[#FEF2F2] rounded-xl flex items-center justify-center">
                    <AlertTriangle size={24} className="text-[#DC2626]" />
                  </div>
                )}
                {report.status === 'reviewed-safe' && (
                  <div className="w-10 h-10 bg-[#D1FAE5] rounded-xl flex items-center justify-center">
                    <CheckCircle2 size={24} className="text-[#10B981]" />
                  </div>
                )}
                {report.status === 'reviewed-scam' && (
                  <div className="w-10 h-10 bg-[#FEF2F2] rounded-xl flex items-center justify-center">
                    <ShieldAlert size={24} className="text-[#DC2626]" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-text-primary">Reported by: {report.reportedBy}</h3>
                    {report.status === 'pending-review' && (
                      <span className="px-2 py-0.5 bg-[#FEF2F2] text-[#DC2626] text-xs font-bold rounded-full uppercase">
                        Pending Review
                      </span>
                    )}
                    {report.status === 'reviewed-scam' && (
                      <span className="px-2 py-0.5 bg-[#DC2626] text-white text-xs font-bold rounded-full uppercase">
                        Scam Confirmed
                      </span>
                    )}
                    {report.status === 'reviewed-safe' && (
                      <span className="px-2 py-0.5 bg-[#10B981] text-white text-xs font-bold rounded-full uppercase">
                        Safe
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm">{report.date}</p>
                  {report.communityMatches > 0 && (
                    <p className="text-[#DC2626] text-xs font-semibold mt-1">
                      Community matches: {report.communityMatches} other users reported similar
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4 p-4 bg-[#F8FAFC] border border-border-light rounded-xl">
              <p className="text-text-primary">{report.message}</p>
            </div>

            {report.detectedTechniques.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {report.detectedTechniques.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#FEF2F2] text-[#DC2626] text-xs font-bold rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <p className="text-text-secondary text-sm mb-4">
              <span className="font-medium">Entity Check:</span> {report.entityChecked}
            </p>

            {report.status === 'pending-review' && (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleConfirmScam(report.id, report.communityMatches)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-xl font-medium transition-colors"
                >
                  <ShieldAlert size={16} />
                  ✓ Confirm Scam
                </button>
                <button
                  onClick={() => handleMarkSafe(report.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-text-primary rounded-xl font-medium transition-colors"
                >
                  <CheckCircle2 size={16} />
                  ○ Mark Safe
                </button>
                <button
                  onClick={() => navigate(`/admin/users/${report.userId}`)}
                  className="flex items-center gap-2 px-4 py-2 border border-border-light hover:border-[#3B82F6] text-[#3B82F6] rounded-xl font-medium transition-colors"
                >
                  View Reporter →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
