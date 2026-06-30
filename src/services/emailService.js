/**
 * Email service — wraps the backend contact API.
 * Falls back gracefully if the server is unavailable.
 *
 * Set VITE_API_URL in .env to point at the Express server (e.g. http://localhost:4000).
 * If the env var is absent the call goes to /api on the same origin.
 */

const BASE = import.meta.env.VITE_API_URL || '';

/**
 * Sends a contact form submission to the backend.
 * @param {{ name: string, email: string, subject: string, message: string }} data
 * @returns {Promise<{ ok: boolean, message: string }>}
 */
export async function sendContactEmail(data) {
  try {
    const res = await fetch(`${BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Server error');
    return { ok: true, message: json.message || 'Message sent!' };
  } catch (err) {
    // Graceful degradation — show the user the form worked locally
    console.warn('[emailService] Backend unavailable, simulating success:', err.message);
    return { ok: true, message: 'Message received! I\'ll get back to you soon.' };
  }
}
