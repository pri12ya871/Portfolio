import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiC, SiCplusplus, SiPython, SiJavascript, SiMysql,
  SiReact, SiHtml5, SiTailwindcss, SiBootstrap, SiMui,
  SiNodedotjs, SiExpress, SiMongodb, SiFirebase,
  SiGit, SiGithub, SiLinux, SiDocker, SiKubernetes,
} from 'react-icons/si';
import { FiCode, FiDatabase, FiServer, FiCloud, FiCpu, FiLayers } from 'react-icons/fi';
import { DiJava, DiCss3 } from 'react-icons/di';

const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    icon: FiCode,
    color: '#2563EB',
    glow: 'rgba(37, 99, 235, 0.3)',
    skills: [
      { name: 'C', icon: SiC, level: 85 },
      { name: 'C++', icon: SiCplusplus, level: 80 },
      { name: 'Java', icon: DiJava, level: 75 },
      { name: 'Python', icon: SiPython, level: 82 },
      { name: 'JavaScript', icon: SiJavascript, level: 88 },
      { name: 'SQL', icon: SiMysql, level: 78 },
    ],
  },
  {
    title: 'Frontend',
    icon: FiLayers,
    color: '#06B6D4',
    glow: 'rgba(6, 182, 212, 0.3)',
    skills: [
      { name: 'React.js', icon: SiReact, level: 90 },
      { name: 'HTML5', icon: SiHtml5, level: 95 },
      { name: 'CSS3', icon: DiCss3, level: 90 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 88 },
      { name: 'Bootstrap', icon: SiBootstrap, level: 82 },
      { name: 'Material UI', icon: SiMui, level: 78 },
    ],
  },
  {
    title: 'Backend',
    icon: FiServer,
    color: '#7C3AED',
    glow: 'rgba(124, 58, 237, 0.3)',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, level: 80 },
      { name: 'Express.js', icon: SiExpress, level: 78 },
      { name: 'RESTful APIs', icon: FiServer, level: 85 },
      { name: 'JWT Auth', icon: FiCode, level: 75 },
      { name: 'Microservices', icon: FiCpu, level: 65 },
    ],
  },
  {
    title: 'Databases',
    icon: FiDatabase,
    color: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.3)',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, level: 80 },
      { name: 'Firebase', icon: SiFirebase, level: 82 },
      { name: 'MySQL', icon: SiMysql, level: 78 },
    ],
  },
  {
    title: 'DevOps & Cloud',
    icon: FiCloud,
    color: '#10B981',
    glow: 'rgba(16, 185, 129, 0.3)',
    skills: [
      { name: 'Git', icon: SiGit, level: 88 },
      { name: 'GitHub', icon: SiGithub, level: 88 },
      { name: 'Linux', icon: SiLinux, level: 72 },
      { name: 'Docker', icon: SiDocker, level: 65 },
      { name: 'Kubernetes', icon: SiKubernetes, level: 55 },
      { name: 'AWS', icon: FiCloud, level: 60 },
      { name: 'GCP', icon: FiCloud, level: 58 },
      { name: 'CI/CD', icon: FiCloud, level: 65 },
    ],
  },
  {
    title: 'Core Concepts',
    icon: FiCpu,
    color: '#EC4899',
    glow: 'rgba(236, 72, 153, 0.3)',
    skills: [
      { name: 'DSA', icon: FiCpu, level: 82 },
      { name: 'OOP', icon: FiCode, level: 88 },
      { name: 'DBMS', icon: FiDatabase, level: 80 },
      { name: 'OS', icon: FiServer, level: 75 },
      { name: 'Networks', icon: FiCloud, level: 72 },
      { name: 'System Design', icon: FiLayers, level: 68 },
      { name: 'Agile', icon: FiCode, level: 80 },
    ],
  },
];

function SkillBadge({ skill, color, delay }) {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.08, y: -3 }}
      className="group relative flex flex-col items-center gap-1.5 p-3 rounded-xl cursor-default"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `${color}11`;
        e.currentTarget.style.border = `1px solid ${color}33`;
        e.currentTarget.style.boxShadow = `0 8px 24px ${color}22`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="relative">
        <Icon
          className="text-xl transition-all duration-300 group-hover:scale-110"
          style={{ color: '#64748B' }}
          onMouseEnter={(e) => e.currentTarget.style.color = color}
          onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
        />
      </div>
      <span className="text-xs font-medium text-center leading-tight" style={{ color: '#94A3B8', fontFamily: 'Inter' }}>
        {skill.name}
      </span>

      {/* Progress bar */}
      <div className="w-full h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </motion.div>
  );
}

function CategoryCard({ category, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = category.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="glass-card p-6 relative overflow-hidden group"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        transition: 'box-shadow 0.4s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 60px ${category.glow}`;
        e.currentTarget.style.borderColor = `${category.color}33`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
      }}
    >
      {/* Background gradient on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${category.color}08, transparent 60%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `${category.color}20`,
            border: `1px solid ${category.color}30`,
          }}
        >
          <Icon className="text-lg" style={{ color: category.color }} />
        </div>
        <h3
          className="text-base font-bold"
          style={{ color: '#F1F5F9', fontFamily: 'Sora, sans-serif' }}
        >
          {category.title}
        </h3>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-3 gap-2">
        {category.skills.map((skill, i) => (
          <SkillBadge
            key={skill.name}
            skill={skill}
            color={category.color}
            delay={index * 0.05 + i * 0.06}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function TechnicalSkills() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <div
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050816 0%, #080d20 50%, #050816 100%)' }}
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #06B6D4, transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{
              background: 'rgba(37, 99, 235, 0.1)',
              border: '1px solid rgba(37, 99, 235, 0.25)',
            }}
          >
            <FiCode style={{ color: '#2563EB' }} />
            <span className="text-xs font-medium tracking-wider uppercase" style={{ color: '#2563EB', fontFamily: 'Inter' }}>
              Technical Arsenal
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            <span className="text-white">Technical </span>
            <span
              style={{
                background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Skills
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base max-w-xl mx-auto"
            style={{ color: '#64748B', fontFamily: 'Inter', lineHeight: 1.7 }}
          >
            A curated toolkit of technologies I use to build robust, scalable, and beautiful software.
          </motion.p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((category, index) => (
            <CategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 text-xs"
          style={{ color: '#334155', fontFamily: 'Inter' }}
        >
          Progress bars are illustrative and represent relative experience level.
        </motion.p>
      </div>
    </div>
  );
}
