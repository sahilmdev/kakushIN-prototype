import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Shield } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full"
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-blue-600">ArthSaathi</span>
          </h1>
          <p className="text-lg text-gray-600">Choose your view to continue</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/user')}
            className="group bg-white rounded-3xl p-10 shadow-xl border-2 border-transparent hover:border-blue-300 transition-all duration-300"
          >
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
              <User size={40} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">User View</h2>
            <p className="text-gray-600 leading-relaxed">
              Experience the full app as a user with onboarding, financial health, scam protection, and more
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin')}
            className="group bg-white rounded-3xl p-10 shadow-xl border-2 border-transparent hover:border-indigo-300 transition-all duration-300"
          >
            <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-200 transition-colors">
              <Shield size={40} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Admin View</h2>
            <p className="text-gray-600 leading-relaxed">
              Access the admin dashboard to manage users, review scams, and monitor analytics
            </p>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}