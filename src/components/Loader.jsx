import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const steps = [
      { target: 40, delay: 100 },
      { target: 70, delay: 300 },
      { target: 90, delay: 550 },
      { target: 100, delay: 750 },
    ];

    let timeouts = [];

    steps.forEach(({ target, delay }) => {
      const t = setTimeout(() => setProgress(target), delay);
      timeouts.push(t);
    });

    const done = setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 450);
    }, 850);
    timeouts.push(done);

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#050816' }}
        >
          {/* Animated background blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 60, 0],
                y: [0, -40, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
              style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }}
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -50, 0],
                y: [0, 60, 0],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl"
              style={{ background: 'radial-gradient(circle, #06B6D4, transparent)' }}
            />
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                x: [0, 30, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-15 blur-3xl"
              style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }}
            />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
            className="relative mb-12"
          >
            {/* Rotating rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 m-auto w-28 h-28 rounded-full border border-transparent"
              style={{
                borderTopColor: '#2563EB',
                borderRightColor: 'transparent',
                borderBottomColor: '#06B6D4',
                borderLeftColor: 'transparent',
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 m-auto w-36 h-36 rounded-full border border-transparent"
              style={{
                borderTopColor: 'transparent',
                borderRightColor: '#7C3AED',
                borderBottomColor: 'transparent',
                borderLeftColor: '#06B6D4',
              }}
            />

            {/* Center logo */}
            <div
              className="relative w-20 h-20 rounded-2xl flex items-center justify-center m-4"
              style={{
                background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
                boxShadow: '0 0 40px rgba(37, 99, 235, 0.5)',
              }}
            >
              <span
                className="text-3xl font-black text-white"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                PS
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl font-bold mb-2 tracking-wider"
            style={{
              fontFamily: 'Sora, sans-serif',
              background: 'linear-gradient(135deg, #ffffff, #94A3B8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Priya Sharma
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-sm mb-12 tracking-[0.3em] uppercase"
            style={{ color: '#06B6D4', fontFamily: 'Inter, sans-serif' }}
          >
            Software Engineer
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 280 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative"
          >
            <div
              className="h-[2px] rounded-full overflow-hidden"
              style={{
                width: 280,
                background: 'rgba(255,255,255,0.08)',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #2563EB, #06B6D4, #7C3AED)',
                  borderRadius: '9999px',
                  boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            <motion.p
              className="text-center mt-4 text-xs font-mono"
              style={{ color: '#64748B' }}
            >
              {progress}%
            </motion.p>
          </motion.div>

          {/* Loading dots */}
          <div className="flex gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#06B6D4' }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
