import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, X, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function SchemesDB() {
  const { schemesDb, updateScheme, addScheme, showToast } = useAdmin();
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    shortName: '',
    benefit: '',
    status: 'active',
    lastVerified: new Date().toISOString().split('T')[0],
    enrolledInPlatform: 0,
    eligibilityCriteria: '',
    source: '',
    notes: ''
  });

  const filteredSchemes = schemesDb.filter(scheme => {
    if (filter === 'needs-review') return scheme.status === 'needs-review';
    if (filter === 'active') return scheme.status === 'active';
    return true;
  });

  const handleEditScheme = (scheme) => {
    setEditingScheme(scheme);
    setFormData({ ...scheme });
    setShowModal(true);
  };

  const handleAddScheme = () => {
    setEditingScheme(null);
    setFormData({
      id: '',
      name: '',
      shortName: '',
      benefit: '',
      status: 'active',
      lastVerified: new Date().toISOString().split('T')[0],
      enrolledInPlatform: 0,
      eligibilityCriteria: '',
      source: '',
      notes: ''
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingScheme) {
      updateScheme(editingScheme.id, formData);
      showToast('Scheme updated');
    } else {
      addScheme({ ...formData, id: formData.shortName.toLowerCase().replace(/\s+/g, '-') });
      showToast('Scheme added to database');
    }
    setShowModal(false);
  };

  const handleMarkVerified = (schemeId) => {
    updateScheme(schemeId, { status: 'active', lastVerified: new Date().toISOString().split('T')[0] });
    showToast('Scheme marked as verified');
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
        <h1 className="font-display text-2xl font-bold text-text-primary">Scheme Database ({schemesDb.length})</h1>
        <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
          <button
            onClick={handleAddScheme}
            className="flex items-center gap-2 px-4 py-2 bg-[#3B82F6] hover:bg-[#1D4ED8] text-white rounded-xl font-medium transition-colors"
          >
            <Plus size={16} />
            Add Scheme
          </button>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:border-[#3B82F6]"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="needs-review">Needs Review</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-border-light rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Scheme</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Last Verified</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Enrolled</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Action</th>
              </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {filteredSchemes.map((scheme) => (
              <tr key={scheme.id} className="hover:bg-[#F8FAFC] transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <h4 className="font-semibold text-text-primary">{scheme.name}</h4>
                    <p className="text-text-secondary text-sm">{scheme.benefit}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {scheme.status === 'active' ? (
                    <span className="flex items-center gap-1 text-success font-medium text-sm">
                      <CheckCircle2 size={16} />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[#F59E0B] font-medium text-sm">
                      <AlertTriangle size={16} />
                      Needs Review
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-text-secondary">{scheme.lastVerified}</td>
                <td className="px-6 py-4 font-mono text-text-primary">{scheme.enrolledInPlatform.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditScheme(scheme)}
                      className="flex items-center gap-1 text-[#3B82F6] hover:underline text-sm font-medium"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    {scheme.status === 'needs-review' && (
                      <button
                        onClick={() => handleMarkVerified(scheme.id)}
                        className="flex items-center gap-1 text-[#10B981] hover:underline text-sm font-medium"
                      >
                        <CheckCircle2 size={14} />
                        Mark Verified
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-xl text-text-primary">
                  {editingScheme ? 'Edit Scheme' : 'Add Scheme'}</h3>
                <button onClick={() => setShowModal(false)} className="text-text-secondary hover:text-text-primary">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Short Name</label>
                  <input
                    type="text"
                    value={formData.shortName}
                    onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F8FAFC] border border-border-light rounded-xl text-text-primary focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F8FAFC] border border-border-light rounded-xl text-text-primary focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Benefit</label>
                  <input
                    type="text"
                    value={formData.benefit}
                    onChange={(e) => setFormData({ ...formData, benefit: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F8FAFC] border border-border-light rounded-xl text-text-primary focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F8FAFC] border border-border-light rounded-xl text-text-primary focus:outline-none focus:border-[#3B82F6]"
                  >
                    <option value="active">Active</option>
                    <option value="needs-review">Needs Review</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Last Verified</label>
                  <input
                    type="date"
                    value={formData.lastVerified}
                    onChange={(e) => setFormData({ ...formData, lastVerified: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F8FAFC] border border-border-light rounded-xl text-text-primary focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Eligibility Criteria</label>
                  <textarea
                    value={formData.eligibilityCriteria}
                    onChange={(e) => setFormData({ ...formData, eligibilityCriteria: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-[#F8FAFC] border border-border-light rounded-xl text-text-primary focus:outline-none focus:border-[#3B82F6] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 bg-[#F8FAFC] border border-border-light rounded-xl text-text-primary focus:outline-none focus:border-[#3B82F6] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Source URL</label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F8FAFC] border border-border-light rounded-xl text-text-primary focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 text-text-secondary hover:text-text-primary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-2 bg-[#3B82F6] hover:bg-[#1D4ED8] text-white rounded-xl font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
