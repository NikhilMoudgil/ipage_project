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

// Express Middlewares
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// API Routes
app.use('/api/enquiries', enquiryRoutes);

// Root Check
app.get('/', (req, res) => {
  res.send('DroneTV Backend API active.');
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});