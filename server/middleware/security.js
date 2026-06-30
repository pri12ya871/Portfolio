import helmet        from 'helmet';
import rateLimit     from 'express-rate-limit';
import cors          from 'cors';
import { config }    from '../config/env.js';

/** Helmet — sets secure HTTP headers */
export const helmetMiddleware = helmet({
  contentSecurityPolicy: false, // relax for API-only server
});

/** CORS — only allow the frontend origin */
export const corsMiddleware = cors({
  origin:      config.frontendUrl,
  methods:     ['GET', 'POST'],
  credentials: false,
});

/** Rate limiter — 30 requests / 15 minutes per IP */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      30,
  message:  { success: false, message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders:   false,
});

/** Contact form limiter — 5 submissions / 15 minutes per IP */
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      5,
  message:  { success: false, message: 'Too many form submissions. Please wait before trying again.' },
});
