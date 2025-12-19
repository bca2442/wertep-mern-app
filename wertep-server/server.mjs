import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

// Import your routes
import authRouter from './routes/auth.route.mjs';

dotenv.config();

// 1. DATABASE CONNECTION
// We use MONGO_URI here. Ensure your Render Environment Key is also MONGO_URI
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('MongoDB Connection Error:', err);
  });

const app = express();

// 2. MIDDLEWARE
app.use(express.json());
app.use(cookieParser());

// 3. API ROUTES
app.use('/api/auth', authRouter);

// 4. SERVE FRONTEND (MERN Deployment Logic)
const __dirname = path.resolve();

// This path joins the current directory with your frontend folder and dist
// It handles the space in 'wertep-front end' safely for Linux/Render
app.use(express.static(path.join(__dirname, 'wertep-front end', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'wertep-front end', 'dist', 'index.html'));
});

// 5. ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// 6. PORT CONFIGURATION
// Render provides the PORT dynamically. Defaulting to 10000 for local testing.
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});