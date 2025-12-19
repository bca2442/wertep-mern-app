import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

// Import your routes
import authRouter from './routes/auth.route.mjs';

dotenv.config();

// 1. DATABASE CONNECTION
// This uses MONGO_URI. You MUST rename the key in Render from MONGO_URL to MONGO_URI
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

// 4. SERVE FRONTEND (Updated folder name to 'wertep-frontend')
const __dirname = path.resolve();

// This tells the server where the 'dist' folder is
app.use(express.static(path.join(__dirname, 'wertep-frontend', 'dist')));

// This handles the "Blank Page" issue by directing all traffic to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'wertep-frontend', 'dist', 'index.html'));
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
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});