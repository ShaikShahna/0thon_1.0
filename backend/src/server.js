import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);

// Global error handler (simple)

const PORT = process.env.PORT ||  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));