import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

// IMPORT YOUR ROUTES (Ensure names are lowercase as we fixed earlier)
import authRouter from './routes/auth.route.mjs';

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('MongoDB Connection Error:', err);
  });

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRouter);

// --- START: SERVE FRONTEND (Crucial for MERN on Render) ---
const __dirname = path.resolve();
// This points to your 'wertep-front end' build folder
app.use(express.static(path.join(__dirname, '/wertep-front end/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'wertep-front end', 'dist', 'index.html'));
});
// --- END: SERVE FRONTEND ---

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// THE PORT FIX - This stops the "Timed Out" error
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});