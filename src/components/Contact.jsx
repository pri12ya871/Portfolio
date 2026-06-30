import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  FiMail, FiSend, FiGithub, FiLinkedin, FiTwitter,
  FiMessageCircle, FiPhone,
} from 'react-icons/fi';
import { HiLocationMarker } from 'react-icons/hi';
import { toast } from 'react-toastify';

/* ── EmailJS credentials — set these in your .env file ──────────────────
 *
 *   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
 *   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
 *   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
 *
 * Your EmailJS template must use these variable names:
 *   {{name}}  {{email}}  {{subject}}  {{message}}
 * ─────────────────────────────────────────────────────────────────────── */
const EJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/* ── contact details ── */
const CONTACT_CARDS = [
  { icon: FiMail,      label: 'Email',      value: 'priyanautiyal978@gmail.com',        href: 'mailto:priyanautiyal978@gmail.com',              color: '#2563EB' },
  { icon: FiPhone,     label: 'Phone',      value: '+91 9041093889',                    href: 'tel:+919041093889',                               color: '#10B981' },
  { icon: FiLinkedin,  label: 'LinkedIn',   value: 'linkedin.com/in/priya-sharma',      href: 'https://www.linkedin.com/in/priya-sharma-a65902253/', color: '#0A66C2' },
  { icon: FiGithub,    label: 'GitHub',     value: 'github.com/pri12ya871',             href: 'https://github.com/pri12ya871',                  color: '#E6EDF3' },
  { icon: FiTwitter,   label: 'X (Twitter)','value': 'x.com/PriyaNautiyal11',          href: 'https://x.com/PriyaNautiyal11',                  color: '#1D9BF0' },
  { icon: HiLocationMarker, label: 'Location', value: 'India 🇮🇳',                     href: null,                                              color: '#F59E0B' },
];

const SOCIAL_ICONS = [
  { icon: FiGithub,   label: 'GitHub',    href: 'https://github.com/pri12ya871',                   color: '#E6EDF3', tip: 'GitHub Profile'   },
  { icon: FiLinkedin, label: 'LinkedIn',  href: 'https://www.linkedin.com/in/priya-sharma-a65902253/', color: '#0A66C2', tip: 'LinkedIn Profile' },
  { icon: FiTwitter,  label: 'Twitter',   href: 'https://x.com/PriyaNautiyal11',                   color: '#1D9BF0', tip: 'X / Twitter'      },
  { icon: FiMail,     label: 'Email',     href: 'mailto:priyanautiyal978@gmail.com',               color: '#2563EB', tip: 'Send Email'        },
  { icon: FiPhone,    label: 'Phone',     href: 'tel:+919041093889',                               color: '#10B981', tip: 'Call Me'          },
];

/* ── Inline field error ── */
function FieldError({ msg }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="text-xs mt-1.5" style={{ color: '#EF4444', fontFamily: 'Inter' }}
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

/* ── Contact card ── */
function ContactCard({ card, index }) {
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.07 }}
      className="flex items-center gap-4 p-4 rounded-xl group cursor-pointer transition-all duration-300"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `${card.color}0c`;
        e.currentTarget.style.borderColor = `${card.color}28`;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 8px 24px ${card.color}18`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      onClick={() => card.href && window.open(card.href, card.href.startsWith('http') ? '_blank' : '_self')}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{ background: `${card.color}15`, border: `1px solid ${card.color}25` }}>
        <Icon className="text-base" style={{ color: card.color }} />
      </div>
      <div className="min-w-0">
        <p className="text-xs mb-0.5" style={{ color: '#475569', fontFamily: 'Inter' }}>{card.label}</p>
        <p className="text-sm font-medium truncate transition-colors duration-200"
          style={{ color: '#94A3B8', fontFamily: 'Inter' }}
          onMouseEnter={e => e.currentTarget.style.color = card.color}
          onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
        >
          {card.value}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Social icon with tooltip & magnetic ── */
function SocialIcon({ item }) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const Icon = item.icon;

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    setPos({ x: cx * 0.25, y: cy * 0.25 });
  };

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setPos({ x: 0, y: 0 }); }}>
      <motion.a
        href={item.href}
        target={item.href.startsWith('http') ? '_blank' : '_self'}
        rel="noopener noreferrer"
        aria-label={item.label}
        onMouseMove={handleMove}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
        style={{
          background: hovered ? `${item.color}1a` : 'rgba(255,255,255,0.05)',
          border: hovered ? `1px solid ${item.color}44` : '1px solid rgba(255,255,255,0.08)',
          boxShadow: hovered ? `0 0 28px ${item.color}44` : 'none',
        }}
      >
        <Icon className="text-xl transition-colors duration-300" style={{ color: hovered ? item.color : '#64748B' }} />
      </motion.a>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }} transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none z-20"
            style={{ background: 'rgba(5,8,22,0.95)', border: `1px solid ${item.color}44`, color: item.color, fontFamily: 'Inter' }}
          >
            {item.tip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Input component ── */
function FormInput({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-2" style={{ color: '#64748B', fontFamily: 'Inter' }}>
        {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
      </label>
      {children}
      <FieldError msg={error} />
    </div>
  );
}

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
  color: '#F1F5F9',
  borderRadius: 12,
  fontFamily: 'Inter',
  fontSize: 14,
  outline: 'none',
  width: '100%',
  transition: 'all 0.3s ease',
};

const onFocus = e => {
  e.target.style.border = '1px solid rgba(37,99,235,0.5)';
  e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
  e.target.style.background = 'rgba(255,255,255,0.06)';
};
const onBlur = e => {
  e.target.style.border = '1px solid rgba(255,255,255,0.09)';
  e.target.style.boxShadow = 'none';
  e.target.style.background = 'rgba(255,255,255,0.04)';
};

/* ── Contact form ── */
function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [sent,     setSent]     = useState(false);

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!formData.name.trim())    e.name    = 'Name is required.';
    if (!formData.email.trim())   e.email   = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = 'Enter a valid email address.';
    if (!formData.subject.trim()) e.subject = 'Subject is required.';
    if (!formData.message.trim()) e.message = 'Message is required.';
    else if (formData.message.trim().length < 10)
      e.message = 'Message must be at least 10 characters.';
    return e;
  };

  const handleChange = e => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || sent) return;

    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);

    try {
      const response = await emailjs.send(
        'service_fgmnypq',
        'template_vjox0of',
        {
          name:    formData.name,
          email:   formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        '7Fwpvka4CKMN_BnHY'
      );

      console.log('Email sent successfully:', response);

      toast.success('Message sent successfully!', {
        icon: '✉️',
        style: {
          background: 'rgba(5,8,22,0.97)',
          border: '1px solid rgba(16,185,129,0.4)',
          color: '#F1F5F9',
        },
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
      setSent(true);
      setTimeout(() => setSent(false), 6000);

    } catch (error) {
      // Log the FULL EmailJS error object — status, text, full response
      console.error('EmailJS Error:', error);
      console.error('Status:', error?.status);
      console.error('Text:', error?.text);

      toast.error('Unable to send message. Please try again.', {
        icon: '❌',
        autoClose: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  // alias so form JSX below can use `form` unchanged
  const form    = formData;
  const sending = loading;

  return (
    <form onSubmit={handleSubmit} noValidate className="p-7 sm:p-8 rounded-2xl"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <h3 className="text-xl font-black text-white mb-1" style={{ fontFamily: 'Sora' }}>Send a Message</h3>
      <p className="text-xs mb-7" style={{ color: '#475569', fontFamily: 'Inter' }}>
        Fill in the form and I'll reply as soon as possible.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <FormInput label="Full Name" required error={errors.name}>
          <input type="text" name="name" value={form.name} onChange={handleChange}
            placeholder="Priya Sharma" className="px-4 py-3 placeholder-slate-600"
            style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </FormInput>
        <FormInput label="Email Address" required error={errors.email}>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            placeholder="your@email.com" className="px-4 py-3 placeholder-slate-600"
            style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </FormInput>
      </div>

      <div className="mb-4">
        <FormInput label="Subject" required error={errors.subject}>
          <input type="text" name="subject" value={form.subject} onChange={handleChange}
            placeholder="Hiring opportunity, collaboration…" className="px-4 py-3 placeholder-slate-600"
            style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </FormInput>
      </div>

      <div className="mb-7">
        <FormInput label="Message" required error={errors.message}>
          <textarea name="message" value={form.message} onChange={handleChange} rows={5}
            placeholder="Tell me about your project, role, or opportunity…"
            className="px-4 py-3 placeholder-slate-600 resize-none"
            style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
          <p className="text-xs mt-1.5 text-right" style={{ color: form.message.length < 10 && form.message.length > 0 ? '#EF4444' : '#334155', fontFamily: 'Inter' }}>
            {form.message.length}/10 min chars
          </p>
        </FormInput>
      </div>

      <motion.button type="submit" disabled={sending}
        whileHover={!sending ? { scale: 1.02, y: -2 } : {}}
        whileTap={!sending ? { scale: 0.98 } : {}}
        className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white"
        style={{
          background: sent ? 'linear-gradient(135deg,#10B981,#059669)' : sending ? 'rgba(37,99,235,0.4)' : 'linear-gradient(135deg,#2563EB,#06B6D4)',
          boxShadow: sending ? 'none' : '0 8px 30px rgba(37,99,235,0.3)',
          fontFamily: 'Inter', cursor: sending ? 'not-allowed' : 'pointer', border: 'none',
          transition: 'background 0.4s ease',
        }}
      >
        {sent ? (
          <><span>✓</span> Message Sent!</>
        ) : sending ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 rounded-full" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
            Sending…
          </>
        ) : (
          <><FiSend className="text-sm" /> Send Message</>
        )}
      </motion.button>
    </form>
  );
}

/* ── Background blobs ── */
function BgBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div animate={{ scale:[1,1.2,1], x:[0,30,0] }} transition={{ duration:13, repeat:Infinity, ease:'easeInOut' }}
        className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.05]"
        style={{ background:'radial-gradient(circle, #2563EB, transparent 70%)' }} />
      <motion.div animate={{ scale:[1,1.15,1], x:[0,-20,0] }} transition={{ duration:10, repeat:Infinity, ease:'easeInOut', delay:2 }}
        className="absolute top-0 right-1/3 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.05]"
        style={{ background:'radial-gradient(circle, #06B6D4, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage:`linear-gradient(rgba(37,99,235,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.4) 1px, transparent 1px)`, backgroundSize:'70px 70px' }} />
    </div>
  );
}

/* ── Main ── */
export default function Contact() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <div className="relative py-24 overflow-hidden"
      style={{ background:'linear-gradient(180deg,#050816 0%,#070b1c 60%,#050816 100%)' }}>
      <BgBlobs />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity:0, y:20 }} animate={titleInView ? { opacity:1, y:0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{ background:'rgba(37,99,235,0.1)', border:'1px solid rgba(37,99,235,0.25)' }}
          >
            <FiMessageCircle style={{ color:'#2563EB' }} />
            <span className="text-xs font-medium tracking-wider uppercase" style={{ color:'#2563EB', fontFamily:'Inter' }}>
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity:0, y:30 }} animate={titleInView ? { opacity:1, y:0 } : {}}
            transition={{ delay:0.1 }}
            className="text-5xl sm:text-6xl font-black mb-5"
            style={{ fontFamily:'Sora, sans-serif' }}
          >
            <span className="text-white">Let's </span>
            <span style={{
              background:'linear-gradient(135deg,#2563EB,#06B6D4)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            }}>Connect</span>
          </motion.h2>

          <motion.p
            initial={{ opacity:0 }} animate={titleInView ? { opacity:1 } : {}} transition={{ delay:0.2 }}
            className="text-base max-w-2xl mx-auto"
            style={{ color:'#64748B', fontFamily:'Inter', lineHeight:1.8 }}
          >
            I'm always open to discussing software engineering opportunities, frontend development roles,
            open-source collaborations, innovative projects, and exciting technical challenges.
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left – info panel */}
          <motion.div
            initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.7 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            <div className="p-6 sm:p-7 rounded-2xl flex flex-col gap-1"
              style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-xl font-black text-white mb-1" style={{ fontFamily:'Sora' }}>Ready to collaborate?</h3>
              <p className="text-sm mb-5 leading-relaxed" style={{ color:'#64748B', fontFamily:'Inter', lineHeight:1.75 }}>
                I'm open to full-time SDE / frontend roles, freelance projects, and technical collaborations.
              </p>
              <div className="grid grid-cols-1 gap-2">
                {CONTACT_CARDS.map((c, i) => <ContactCard key={c.label} card={c} index={i} />)}
              </div>
            </div>

            {/* Large social icons */}
            <div className="p-6 rounded-2xl" style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color:'#334155', fontFamily:'Inter' }}>
                Follow & Connect
              </p>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_ICONS.map(item => <SocialIcon key={item.label} item={item} />)}
              </div>
            </div>
          </motion.div>

          {/* Right – form */}
          <motion.div
            initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.7, delay:0.1 }}
            className="lg:col-span-3"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
