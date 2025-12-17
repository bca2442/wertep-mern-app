import express from 'express';
// Import the necessary controller functions, including the new signout
import { signup, signin, signout } from '../controllers/auth.controller.mjs'; 

const router = express.Router();

// Existing Routes
router.post('/signup', signup);
router.post('/signin', signin);

// --- New Sign-Out Route ---

/**
 * Route: POST /api/auth/signout
 * Description: Maps the signout URL to the signout controller function.
 */
router.post('/signout', signout); 

export default router;