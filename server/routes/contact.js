import { Router }  from 'express';
import { body }    from 'express-validator';
import { handleContact } from '../controllers/contactController.js';
import { contactLimiter } from '../middleware/security.js';

const router = Router();

const contactValidation = [
  body('name')
    .trim().notEmpty().withMessage('Name is required.')
    .isLength({ max: 120 }).withMessage('Name is too long.'),
  body('email')
    .trim().notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email address.')
    .normalizeEmail(),
  body('subject')
    .optional().trim()
    .isLength({ max: 200 }).withMessage('Subject is too long.'),
  body('message')
    .trim().notEmpty().withMessage('Message is required.')
    .isLength({ min: 10 }).withMessage('Message must be at least 10 characters.')
    .isLength({ max: 5000 }).withMessage('Message is too long.'),
];

router.post('/', contactLimiter, contactValidation, handleContact);

export default router;
