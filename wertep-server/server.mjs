import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.mjs'; // For /api/auth routes (Sign-In/Sign-Out)
import userRoutes from './routes/user.route.mjs'; // For /api/user routes (Profile/Update/Delete)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Assuming you have a database connection string in a .env file
dotenv.config();

// The environment variable for the database connection string
const DB_CONNECTION_STRING = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_app'; 
const PORT = process.env.PORT || 3000;

// --- Database Connection ---
mongoose.connect(DB_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.error('MongoDB Connection Error:', err);
    });
// ----------------------------


const app = express();

// --- Middleware Setup ---
// 1. Allows Express to parse JSON body from incoming requests (for POST/PUT requests)
app.use(express.json()); 
// 2. Middleware to parse cookies (necessary for reading/clearing the 'jwt' token)
app.use(cookieParser()); 
// -------------------------

// --- Route Connection ---
// The application uses these files to determine which controller function to call
app.use('/api/auth', authRoutes); // Base path: /api/auth
app.use('/api/user', userRoutes); // Base path: /api/user
// ------------------------

// --- Static Content (Optional - for serving the frontend build) ---
// If you are serving a frontend build (e.g., React/Vue), you would add this:
/*
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
*/
// ------------------------------------------------------------------

// --- Final Error Handling Middleware ---
/**
 * This is the final middleware layer that catches all errors (next(error)) 
 * thrown by controllers or other middleware (like verifyUser). 
 * It ensures a standardized, clean JSON response for errors.
 */
app.use((err, req, res, next) => {
    // Determine the status code (default to 500 Internal Server Error)
    const statusCode = err.statusCode || 500;
    // Determine the error message (default to 'Internal Server Error')
    const message = err.message || 'Internal Server Error';
    
    // Send a structured JSON response
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
// ----------------------------------------

// --- Server Listener ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});