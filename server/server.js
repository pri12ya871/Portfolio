import express     from 'express';
import path        from 'path';
import { fileURLToPath } from 'url';
import { config }  from './config/env.js';
import { helmetMiddleware, corsMiddleware, apiLimiter } from './middleware/security.js';
import contactRoutes from './routes/contact.js';
import resumeRoutes  from './routes/resume.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

/* ── Security middleware ── */
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(apiLimiter);

/* ── Routes ── */
app.get('/', (_req, res) => res.json({ message: 'Priya Sharma Portfolio API', status: 'ok' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() }));
app.use('/api/contact', contactRoutes);
app.use('/api/resume',  resumeRoutes);

/* ── Serve static frontend in production ── */
if (config.nodeEnv === 'production') {
  const distPath = path.resolve(__dirname, '../dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

/* ── 404 handler ── */
app.use((_req, res) => res.status(404).json({ success: false, message: 'Route not found.' }));

/* ── Global error handler ── */
app.use((err, _req, res, _next) => {
  console.error('[server]', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

app.listen(config.port, () => {
  console.log(`\n🚀  Portfolio API running on http://localhost:${config.port}`);
  console.log(`   Environment : ${config.nodeEnv}`);
  console.log(`   Health      : http://localhost:${config.port}/api/health\n`);
});

export default app;
