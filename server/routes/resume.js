import { Router } from 'express';
import path       from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

/**
 * GET /api/resume
 * Streams the resume PDF for download.
 */
router.get('/', (req, res) => {
  const file = path.resolve(__dirname, '../../public/PRIYA_SOFTWARE_RESUME.pdf');
  res.download(file, 'Priya_Sharma_Resume.pdf', err => {
    if (err) {
      console.error('[resume] Download failed:', err);
      res.status(404).json({ success: false, message: 'Resume not found.' });
    }
  });
});

export default router;
