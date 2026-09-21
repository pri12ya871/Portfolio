import { motion } from 'framer-motion';

/**
 * The only scroll animation on the site: a short fade-and-rise, once.
 * Honours prefers-reduced-motion through <MotionConfig reducedMotion="user"> in App.
 */
export default function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
