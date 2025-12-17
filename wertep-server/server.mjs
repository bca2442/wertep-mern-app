import express from 'express';
import path from 'path'; // 1. Added path module
import { fileURLToPath } from 'url'; // 2. Needed for __dirname in .mjs
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.mjs';
import userRoutes from './routes/user.route.mjs';

dotenv.config();

// --- 2. Fix for __dirname in ES Modules (.mjs) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use MONGO (matching your Render environment variable)
const DB_CONNECTION_STRING = process.env.MONGO; 
const PORT = process.env.PORT || 10000;

// --- Database Connection ---
mongoose.connect(DB_CONNECTION_STRING)
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

const app = express();

// --- Middleware Setup ---
app.use(express.json()); 
app.use(cookieParser()); 

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// --- 3. Serving the Frontend (CRITICAL FOR DEPLOY) ---
// This serves the static files from your React "dist" folder
app.use(express.static(path.join(__dirname, '../wertep-front end/dist')));

// This ensures that any request not matching an API route 
// sends the user to your index.html (important for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../wertep-front end/dist/index.html'));
});

// --- Final Error Handling ---
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});