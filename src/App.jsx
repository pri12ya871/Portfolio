import { useState, useEffect, lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppProvider } from './context/AppContext';
import ErrorBoundary   from './components/ErrorBoundary';
import SEO             from './components/SEO';
import Cursor          from './components/Cursor';
import Loader          from './components/Loader';
import Navbar          from './components/Navbar';
import NoiseBg         from './components/NoiseBg';
import NotFound        from './components/NotFound';

/* Code-split heavy sections */
const Hero            = lazy(() => import('./components/Hero'));
const TechnicalSkills = lazy(() => import('./components/TechnicalSkills'));
const Projects        = lazy(() => import('./components/Projects'));
const Experience      = lazy(() => import('./components/Experience'));
const Certifications  = lazy(() => import('./components/Certifications'));
const Resume          = lazy(() => import('./components/Resume'));
const Contact         = lazy(() => import('./components/Contact'));
const Footer          = lazy(() => import('./components/Footer'));

/** Minimal section-level suspense fallback — keeps layout stable */
function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-24" style={{ minHeight: 200 }}>
      <div
        className="w-8 h-8 rounded-full border-2 border-transparent animate-spin"
        style={{ borderTopColor: '#2563EB', borderRightColor: '#06B6D4' }}
      />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Safety backstop only — the Loader itself finishes in ~1.3s
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <ErrorBoundary>
      <AppProvider>
        <SEO />
        <Cursor />
        <NoiseBg />

        {loading ? (
          <Loader onComplete={() => setLoading(false)} />
        ) : (
          <div className="relative">
            <Navbar />
            <main id="main-content" role="main">
              <Suspense fallback={<SectionFallback />}>
                <section id="home"           aria-label="Home"><Hero /></section>
                <section id="skills"         aria-label="Technical Skills"><TechnicalSkills /></section>
                <section id="projects"       aria-label="Projects"><Projects /></section>
                <section id="experience"     aria-label="Experience"><Experience /></section>
                <section id="certifications" aria-label="Certifications & Achievements"><Certifications /></section>
                <section id="resume"         aria-label="Resume"><Resume /></section>
                <section id="contact"        aria-label="Contact"><Contact /></section>
              </Suspense>
            </main>
            <Suspense fallback={null}><Footer /></Suspense>
          </div>
        )}

        <ToastContainer
          position="bottom-right"
          autoClose={4500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
          toastStyle={{
            background: 'rgba(5,8,22,0.97)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(37,99,235,0.3)',
            borderRadius: '12px',
            fontFamily: 'Inter, sans-serif',
          }}
        />
      </AppProvider>
    </ErrorBoundary>
  );
}
