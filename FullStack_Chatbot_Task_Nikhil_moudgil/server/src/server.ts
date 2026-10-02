import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import enquiryRoutes from './routes/enquiryRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// CORS Middleware Configuration
const allowedOrigins = [
  'http://localhost:5173', // Vite default port
  'http://localhost:3000', // React App default port
  process.env.CLIENT_URL || ''
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// API Routes
app.use('/api/enquiries', enquiryRoutes);

// Root Health Check Route
app.get('/', (req, res) => {
  res.send('DroneTV Backend API active.');
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});