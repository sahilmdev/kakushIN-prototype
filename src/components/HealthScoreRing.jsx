import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HealthScoreRing({ score, size = 100, strokeWidth = 8 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  const [displayScore, setDisplayScore] = useState(0);

  // Determine color based on score range
  const getColor = (s) => {
    if (s < 40) return '#DC2626'; // Red 600
    if (s <= 60) return '#2563EB'; // Blue 600
    return '#16A34A'; // Green 600
  };

  const color = getColor(score);

  // Animate the counter
  useEffect(() => {
    let start = 0;
    const end = score;
    const duration = 1200;
    const stepTime = duration / end;
    let current = start;

    const timer = setInterval(() => {
      current += 1;
      setDisplayScore(current);
      if (current >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F1F5F9"
          strokeWidth={strokeWidth}
        />
        {/* Animated progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="font-mono text-xl font-bold text-text-primary leading-none">{displayScore}</span>
        <span className="text-[9px] text-text-muted font-bold uppercase tracking-tighter mt-0.5">Health</span>
      </div>
    </div>
  );
}
