import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Landmark, ArrowLeft } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAdmin();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col items-center justify-center p-4">
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-text-secondary hover:text-primary flex items-center gap-2 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to User App
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl border-t-4 border-[#2563EB]"
      >
        <div className="w-14 h-14 rounded-xl bg-[#E0E7FF] flex items-center justify-center mx-auto mb-6">
          <Landmark size={28} className="text-[#2563EB]" />
        </div>

        <h1 className="font-display text-2xl font-bold text-center text-text-primary mb-2">ArthSaathi</h1>
        <p className="text-text-secondary text-center mb-8">Admin Portal</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Organisation Name</label>
            <input
              type="text"
              placeholder="Zomato Partner Welfare"
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-border-light rounded-xl text-text-primary focus:outline-none focus:border-[#2563EB] transition-colors"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@demo.in"
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-border-light rounded-xl text-text-primary focus:outline-none focus:border-[#2563EB] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-border-light rounded-xl text-text-primary focus:outline-none focus:border-[#2563EB] transition-colors"
            />
          </div>

          {error && (
            <p className="text-[#DC2626] text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-3 rounded-xl transition-colors"
          >
            Sign In
          </button>

          <div className="pt-4 border-t border-border-light">
            <p className="text-xs text-text-muted text-center">
              Demo credentials: <span className="font-mono font-medium">admin@demo.in / demo123</span>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
