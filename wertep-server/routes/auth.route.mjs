import express from 'express';
// Ensure this path is exactly lowercase and ends in .mjs
import { signup, signin } from '../controllers/auth.controller.mjs';

const router = express.Router();

// Define your authentication routes
router.post('/signup', signup);
router.post('/signin', signin);

export default router;