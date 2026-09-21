import { MotionConfig } from 'framer-motion';

import ErrorBoundary   from './components/ErrorBoundary';
import SEO             from './components/SEO';
import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import About           from './components/About';
import TechnicalSkills from './components/TechnicalSkills';
import Projects        from './components/Projects';
import Experience      from './components/Experience';
import Certifications  from './components/Certifications';
import Resume          from './components/Resume';
import Contact         from './components/Contact';
import Footer          from './components/Footer';

export default function App() {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <SEO />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] btn btn-solid">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">
          <section id="home"           aria-label="Introduction"><Hero /></section>
          <section id="about"          aria-labelledby="about-title"><About /></section>
          <section id="skills"         aria-labelledby="skills-title"><TechnicalSkills /></section>
          <section id="projects"       aria-labelledby="projects-title"><Projects /></section>
          <section id="experience"     aria-labelledby="experience-title"><Experience /></section>
          <section id="certifications" aria-labelledby="achievements-title"><Certifications /></section>
          <section id="resume"         aria-labelledby="resume-title"><Resume /></section>
          <section id="contact"        aria-labelledby="contact-title"><Contact /></section>
        </main>
        <Footer />
      </MotionConfig>
    </ErrorBoundary>
  );
}
