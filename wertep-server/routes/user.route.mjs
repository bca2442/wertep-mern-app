import express from 'express';
// Import controller functions
import { deleteUser, test, updateUser } from '../controllers/user.controller.js';
// Import the middleware to secure the routes
import { verifyToken } from '../utils/verifyUser.mjs'; 

const router = express.Router();

router.get('/test', test); // Public route: No verification needed

// --- PROTECTED ROUTES ---
// The verifyToken middleware runs before the controller function.
// It checks the JWT cookie and attaches the user's ID to req.user.

// POST /api/user/update/:id
router.post('/update/:id', verifyToken, updateUser);

// DELETE /api/user/delete/:id
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;