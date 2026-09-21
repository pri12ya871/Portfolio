import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import { ArrowOut } from './Icons';

const EJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'service_fgmnypq';
const EJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_vjox0of';
const EJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '7Fwpvka4CKMN_BnHY';

/* Every channel appears exactly once, and every row is a real <a>.
   (Previously the same five links were shown twice — as cards and again as
   icon buttons — and the cards were <div onClick>, so they couldn't be
   right-clicked, copied, or reached with the keyboard.) */
const CHANNELS = [
  { label: 'Email',    value: 'priyanautiyal978@gmail.com',  href: 'mailto:priyanautiyal978@gmail.com' },
  { label: 'LinkedIn', value: 'in/priya-sharma-a65902253',   href: 'https://www.linkedin.com/in/priya-sharma-a65902253/' },
  { label: 'GitHub',   value: 'pri12ya871',                  href: 'https://github.com/pri12ya871' },
  { label: 'X',        value: '@PriyaNautiyal11',            href: 'https://x.com/PriyaNautiyal11' },
  { label: 'Phone',    value: '+91 90410 93889',             href: 'tel:+919041093889' },
];

const EMPTY = { name: '', email: '', subject: '', message: '' };

function validate(f) {
  const e = {};
  if (!f.name.trim()) e.name = 'Please add your name.';
  if (!f.email.trim()) e.email = 'Please add your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'That email doesn\'t look right.';
  if (!f.subject.trim()) e.subject = 'Please add a subject.';
  if (f.message.trim().length < 10) e.message = 'A little more detail, please (10+ characters).';
  return e;
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-[15px] font-semibold" style={{ color: 'var(--ink)' }}>{label}</label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-[14px]" style={{ color: 'var(--err)' }}>{error}</p>}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed

  const change = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: undefined }));
    if (status === 'sent' || status === 'failed') setStatus('idle');
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`cf-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      await emailjs.send(EJS_SERVICE_ID, EJS_TEMPLATE_ID, form, EJS_PUBLIC_KEY);
      setForm(EMPTY);
      setStatus('sent');
    } catch (err) {
      console.error('EmailJS error:', err?.status, err?.text);
      setStatus('failed');
    }
  };

  const input = (name, props = {}) => ({
    id: `cf-${name}`,
    name,
    value: form[name],
    onChange: change,
    className: 'field',
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `cf-${name}-err` : undefined,
    ...props,
  });

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cf-name" label="Your name" error={errors.name}>
          <input type="text" autoComplete="name" {...input('name')} />
        </Field>
        <Field id="cf-email" label="Email" error={errors.email}>
          <input type="email" autoComplete="email" {...input('email')} />
        </Field>
      </div>
      <Field id="cf-subject" label="Subject" error={errors.subject}>
        <input type="text" placeholder="A role, a project, a question…" {...input('subject')} />
      </Field>
      <Field id="cf-message" label="Message" error={errors.message}>
        <textarea rows={6} {...input('message', { className: 'field resize-y' })} />
      </Field>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-solid" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p role="status" aria-live="polite" className="text-[15px]"
          style={{ color: status === 'failed' ? 'var(--err)' : 'var(--ok)' }}>
          {status === 'sent' && 'Thanks — your message is on its way. I\'ll reply soon.'}
          {status === 'failed' && <>Couldn't send that. Please email me directly at <a className="link" href="mailto:priyanautiyal978@gmail.com">priyanautiyal978@gmail.com</a>.</>}
        </p>
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <div className="section">
      <div className="wrap">
        <SectionHeader
          id="contact-title"
          num="07"
          label="Contact"
          title={<>Let's <em>talk</em></>}
          intro="Open to full-time SDE, frontend and full-stack roles, freelance projects and technical collaborations. Based in India."
        />

        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-20">
          <Reveal>
            <ul className="list-none m-0 p-0" style={{ borderTop: '1.5px solid var(--ink)' }}>
              {CHANNELS.map((c) => {
                const external = c.href.startsWith('http');
                return (
                  <li key={c.label} style={{ borderBottom: '1px solid var(--rule)' }}>
                    <a
                      href={c.href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group grid grid-cols-[88px_minmax(0,1fr)_20px] items-center gap-3 py-4 no-underline"
                      style={{ color: 'var(--ink)' }}
                    >
                      <span className="mono" style={{ color: 'var(--ink-3)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em' }}>{c.label}</span>
                      <span className="truncate text-[17px] font-medium group-hover:text-[var(--accent)] transition-colors">{c.value}</span>
                      <ArrowOut size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]" />
                      {external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
