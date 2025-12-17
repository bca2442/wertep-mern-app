import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'; // Replace with your actual path/name
import authRouter from './routes/auth.route.js'; // Replace with your actual path/name
import path from 'path';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.log(err);
    });

// Define __dirname for ES Modules (crucial for path resolution)
const __dirname = path.resolve();

const app = express();

// Middleware to parse JSON in request bodies
app.use(express.json());


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});


// ----------------------------------------------------
// 1. API ROUTES
// ----------------------------------------------------

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// Add all other API routes here (e.g., product, listings, etc.)
// ... your other routes here ...


// ----------------------------------------------------
// 2. PRODUCTION STATIC ASSETS CONFIGURATION (The fix you needed)
// ----------------------------------------------------

// Serve the static files from the frontend build folder
app.use(express.static(path.join(__dirname, '/wertep-front end/dist')));

// For any route not handled by the API, serve the frontend's index.html
// This allows React Router to handle all client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'wertep-front end', 'dist', 'index.html'));
});


// ----------------------------------------------------
// 3. ERROR HANDLING MIDDLEWARE
// ----------------------------------------------------

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});