import nodemailer    from 'nodemailer';
import { validationResult } from 'express-validator';
import { config }   from '../config/env.js';

/**
 * Sanitises a string to prevent XSS — strips HTML tags.
 */
function sanitise(str = '') {
  return String(str).replace(/<[^>]*>/g, '').trim();
}

/**
 * POST /api/contact
 * Validates, sanitises, and emails the contact form submission.
 */
export async function handleContact(req, res) {
  /* 1. Validate */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed.',
      errors:  errors.array().map(e => ({ field: e.path, msg: e.msg })),
    });
  }

  /* 2. Sanitise */
  const name    = sanitise(req.body.name);
  const email   = sanitise(req.body.email);
  const subject = sanitise(req.body.subject || 'Portfolio Contact Form');
  const message = sanitise(req.body.message);

  /* 3. Build transporter */
  if (!config.emailUser || !config.emailPass) {
    console.warn('[contact] EMAIL_USER / EMAIL_PASS not set — logging instead of sending.');
    console.log({ name, email, subject, message });
    return res.status(200).json({ success: true, message: 'Message received!' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: config.emailUser, pass: config.emailPass },
  });

  /* 4. Send */
  try {
    await transporter.sendMail({
      from:    `"Portfolio Contact" <${config.emailUser}>`,
      to:      config.emailTo,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#f8fafc;border-radius:12px;">
          <h2 style="color:#2563EB;margin:0 0 16px">New Portfolio Message</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#64748B;font-size:13px;width:90px">Name</td><td style="padding:8px 0;color:#1e293b;font-size:14px;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#64748B;font-size:13px">Email</td><td style="padding:8px 0;color:#1e293b;font-size:14px"><a href="mailto:${email}" style="color:#2563EB">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#64748B;font-size:13px">Subject</td><td style="padding:8px 0;color:#1e293b;font-size:14px">${subject}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#fff;border-radius:8px;border-left:3px solid #2563EB;">
            <p style="margin:0;color:#334155;font-size:14px;line-height:1.7;white-space:pre-line">${message}</p>
          </div>
          <p style="margin-top:20px;color:#94a3b8;font-size:12px">Sent via Priya Sharma's Portfolio — priyasharma.dev</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('[contact] Email send failed:', err);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
}
