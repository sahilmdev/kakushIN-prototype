import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Flag, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import HealthScoreRing from '../../components/HealthScoreRing';

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { users, toggleUserFlag, showToast } = useAdmin();
  const user = users.find(u => u.id === userId);
  const [notes, setNotes] = useState('Rajesh is improving well. Flagged PM-JAY on 14 Nov. Follow up on PMSBY enrollment.');
  const [showNudgeModal, setShowNudgeModal] = useState(false);

  if (!user) {
    return (
      <div className="p-6">
        <button onClick={() => navigate('/admin/users')} className="flex items-center gap-2 text-text-secondary hover:text-primary mb-4">
          <ArrowLeft size={16} />
          Back
        </button>
        <p>User not found</p>
      </div>
    );
  }

  const handleSendNudge = (message) => {
    showToast(`Nudge sent to ${user.name}: "${message}"`);
    setShowNudgeModal(false);
  };

  const handleFlag = () => {
    toggleUserFlag(user.id);
    showToast(user.flagged ? `${user.name} unflagged` : `${user.name} flagged for attention`);
  };

  const handleSaveNotes = () => {
    showToast('Notes saved');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="p-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin/users')} className="flex items-center gap-2 text-text-secondary hover:text-primary">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-display text-2xl font-bold text-text-primary">{user.name}</h1>
            <p className="text-text-secondary">{user.occupation} · {user.city} · Joined {user.joinedDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button
            onClick={() => setShowNudgeModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#3B82F6] hover:bg-[#1D4ED8] text-white rounded-xl font-medium transition-colors"
          >
            <Send size={16} />
            Send Nudge
          </button>
          <button
            onClick={handleFlag}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
              user.flagged ? 'bg-[#DC2626] text-white' : 'bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEE2E2]'
            }`}
          >
            <Flag size={16} />
            {user.flagged ? 'Unflag' : 'Flag'}
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-border-light rounded-2xl p-5 shadow-card text-center">
          <HealthScoreRing score={user.healthScore} size={80} strokeWidth={6} />
          <p className="text-text-secondary text-xs mt-2 uppercase tracking-wider">Score</p>
          <p className="font-mono text-xl font-bold text-text-primary">{user.healthScorePrev} → {user.healthScore}</p>
          <p className={`text-xs font-bold ${user.healthScoreDelta.startsWith('+') ? 'text-success' : 'text-danger'}`}>
            {user.healthScoreDelta} since joining
          </p>
        </div>
        <div className="bg-white border border-border-light rounded-2xl p-5 shadow-card">
          <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Income Median</p>
          <p className="font-mono text-2xl font-bold text-text-primary">₹{user.incomeMedian.toLocaleString()}</p>
          <p className="text-text-secondary text-xs mt-1">/month</p>
        </div>
        <div className="bg-white border border-border-light rounded-2xl p-5 shadow-card">
          <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Emergency Fund</p>
          <p className="font-mono text-2xl font-bold text-text-primary">{user.emergencyFundPct}%</p>
          <p className="text-text-secondary text-xs mt-1">of target</p>
        </div>
        <div className="bg-white border border-border-light rounded-2xl p-5 shadow-card">
          <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Debts</p>
          <p className="font-mono text-2xl font-bold text-text-primary">{user.debtCount}</p>
          <p className="text-text-secondary text-xs mt-1">active</p>
        </div>
      </div>

      {/* Fingerprint + Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-border-light rounded-2xl p-6 shadow-card">
          <h3 className="font-display font-semibold text-text-primary mb-4">Financial Fingerprint</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary text-sm">Income Type</span>
              <span className="text-text-primary font-medium">Variable Gig</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary text-sm">Risk Profile</span>
              <span className="text-text-primary font-medium">{user.fingerprint.riskProfile}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary text-sm">Trust Level</span>
              <span className="text-text-primary font-medium">{user.fingerprint.trustLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary text-sm">Literacy</span>
              <span className="text-text-primary font-medium">{user.fingerprint.literacyBaseline}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border-light rounded-2xl p-6 shadow-card">
          <h3 className="font-display font-semibold text-text-primary mb-4">Activity Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary text-sm">Schemes Unlocked</span>
              <span className="text-text-primary font-medium">{user.schemesUnlocked}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary text-sm">Scam Alerts</span>
              <span className="text-text-primary font-medium">{user.scamAlertsReceived}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary text-sm">Docs Analysed</span>
              <span className="text-text-primary font-medium">{user.docsAnalysed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary text-sm">Last Active</span>
              <span className="text-text-primary font-medium">{user.lastActive}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Debts + Schemes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-border-light rounded-2xl p-6 shadow-card">
          <h3 className="font-display font-semibold text-text-primary mb-4">Debt Overview</h3>
          <div className="space-y-3">
            <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl flex justify-between items-center">
              <div>
                <p className="font-medium text-text-primary">EarlySalary</p>
                <p className="text-[#DC2626] text-xs font-bold">36% APR</p>
              </div>
              <span className="font-mono font-bold text-text-primary">₹8,000</span>
            </div>
            <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl flex justify-between items-center">
              <div>
                <p className="font-medium text-text-primary">MoneyTap</p>
                <p className="text-[#F59E0B] text-xs font-bold">24% APR</p>
              </div>
              <span className="font-mono font-bold text-text-primary">₹5,000</span>
            </div>
            <div className="pt-2 border-t border-[#F1F5F9] flex justify-between items-center">
              <span className="text-text-secondary text-sm">Combined EMI</span>
              <span className="font-mono font-bold text-text-primary">₹1,840/mo</span>
            </div>
            <p className="text-text-secondary text-sm">Monthly cost of debt: 10% of median income</p>
          </div>
        </div>

        <div className="bg-white border border-border-light rounded-2xl p-6 shadow-card">
          <h3 className="font-display font-semibold text-text-primary mb-4">Scheme Status</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-success" />
              <span className="text-text-primary">PM-JAY</span>
              <span className="text-text-secondary text-sm ml-auto">✓ Guided</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-success" />
              <span className="text-text-primary">e-SHRAM</span>
              <span className="text-text-secondary text-sm ml-auto">✓ Guided</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-[#F59E0B]" />
              <span className="text-text-primary">PMSBY</span>
              <span className="text-text-secondary text-sm ml-auto">○ Shown, pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white border border-border-light rounded-2xl p-6 shadow-card">
        <h3 className="font-display font-semibold text-text-primary mb-4">FWM Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-32 p-4 bg-[#F8FAFC] border border-border-light rounded-xl text-text-primary text-sm focus:outline-none focus:border-[#3B82F6] resize-none"
        />
        <button
          onClick={handleSaveNotes}
          className="mt-4 px-4 py-2 bg-[#3B82F6] hover:bg-[#1D4ED8] text-white rounded-xl font-medium transition-colors"
        >
          Save Note
        </button>
      </div>

      {/* Nudge Modal */}
      <AnimatePresence>
        {showNudgeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNudgeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
            >
              <h3 className="font-display font-bold text-xl text-text-primary mb-4">Send Nudge to {user.name}</h3>
              <div className="space-y-3 mb-6">
                {[
                  'Check your emergency fund target',
                  'You have an unreviewed scheme match',
                  'Your PMSBY enrollment is pending',
                  'Review your high-interest debts'
                ].map((msg, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendNudge(msg)}
                    className="w-full text-left p-3 bg-[#F8FAFC] border border-border-light rounded-xl hover:border-[#3B82F6] transition-colors"
                  >
                    {msg}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowNudgeModal(false)}
                className="w-full py-2 text-text-secondary hover:text-text-primary"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
