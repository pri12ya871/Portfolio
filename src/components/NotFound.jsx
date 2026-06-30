import { motion } from 'framer-motion';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

/**
 * 404 Not Found page — shown when a route doesn't exist.
 */
export default function NotFound() {
  const scrollHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // If using hash routing, navigate to home
    window.location.hash = '#home';
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ background: '#050816', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center"
      >
        {/* Glitchy 404 */}
        <motion.div
          animate={{ opacity: [1, 0.8, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-[120px] sm:text-[180px] font-black leading-none mb-2 select-none"
          style={{
            background: 'linear-gradient(135deg, #2563EB, #06B6D4, #7C3AED)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: 'Sora, sans-serif',
          }}
        >
          404
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-black text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base mb-10 max-w-md mx-auto" style={{ color: '#64748B', lineHeight: 1.75 }}>
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to the portfolio.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#F1F5F9',
            }}
          >
            <FiArrowLeft />
            Go Back
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollHome}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
            style={{
              background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
              boxShadow: '0 8px 24px rgba(37,99,235,0.35)',
            }}
          >
            <FiHome />
            Back to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
