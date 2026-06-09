import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Zap, Shield, Eye, BookOpen, AlertTriangle, BarChart2, Landmark, CheckCircle, ArrowRight } from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';

export default function Onboarding() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [phase, setPhase] = useState('welcome'); // welcome, questions, building, reveal, done

  // Welcome → Questions
  const startOnboarding = () => setPhase('questions');

  // Questions logic (simplified for prototype)
  const [currentQ, setCurrentQ] = useState(0);
  const nextQuestion = () => {
    if (currentQ < 2) setCurrentQ(currentQ + 1);
    else setPhase('building');
  };

  // Auto-progress building phase
  useEffect(() => {
    if (phase === 'building') {
      const timer = setTimeout(() => navigate('/dashboard'), 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {phase === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-md w-full bg-white border border-border-light rounded-3xl p-10 text-center shadow-modal"
          >
            <div className="w-20 h-20 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-8 shadow-blue">
              <Landmark size={40} className="text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-text-primary mb-3">
              {t('onboarding.greeting')}
            </h1>
            <p className="text-text-secondary font-body leading-relaxed mb-8">
              {t('onboarding.subgreeting')}
            </p>
            <button
              onClick={startOnboarding}
              className="w-full bg-primary hover:bg-primary-dark text-white font-body font-bold py-4 rounded-2xl shadow-blue transition-all flex items-center justify-center gap-2 group"
            >
              Get Started
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="mt-6">
              <LanguageToggle />
            </div>
          </motion.div>
        )}

        {phase === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-lg w-full bg-white border border-border-light rounded-3xl p-10 shadow-modal"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-primary text-xs font-bold uppercase tracking-widest">Question {currentQ + 1} of 3</span>
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className={`h-1 w-8 rounded-full transition-all ${i <= currentQ ? 'bg-primary' : 'bg-app-bg'}`} />
                ))}
              </div>
            </div>
            
            <h2 className="font-display text-2xl font-bold text-text-primary mb-8 leading-tight">
              {t(`onboarding.questions.${currentQ}`)}
            </h2>

            <div className="space-y-3">
              {['Yes, often', 'Sometimes', 'Rarely', 'Never'].map((opt) => (
                <button
                  key={opt}
                  onClick={nextQuestion}
                  className="w-full text-left p-4 rounded-xl border border-border-light hover:border-primary hover:bg-primary-light transition-all font-body text-text-primary font-medium"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'building' && (
          <motion.div
            key="building"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h2 className="font-display text-xl font-bold text-text-primary">
              {t('onboarding.buildingProfile')}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
