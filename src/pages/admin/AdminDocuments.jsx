import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function AdminDocuments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="p-6"
    >
      <h1 className="font-display text-2xl font-bold text-text-primary mb-6">Documents</h1>
      <div className="bg-white border border-border-light rounded-2xl p-12 text-center shadow-card">
        <FileText size={64} className="mx-auto mb-4 text-text-muted" />
        <h3 className="font-display font-semibold text-lg text-text-primary mb-2">Document Queue</h3>
        <p className="text-text-secondary">Document review interface coming soon</p>
      </div>
    </motion.div>
  );
}
