import express from 'express';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employeeRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import userRoutes from './routes/userRoutes.js'
import mongoose from 'mongoose';
// import connectDB from './config/db.js';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Employee API routes, Menu API routes, Category API routes, Rating API routes, Comment API routes
app.use('/api/employees', employeeRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

// MongoDB connection
// const PORT = process.env.PORT || 5000;

// connectDB()
//     .then(() => {
//         app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     })
//     .catch((err) => {
//         console.error('MongoDB connection error:', err);
//     });

// Vercel deployment
let isConnected = false;

async function connectDB() {
    if (isConnected) return ;
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
}

export default async function handler(req, res) {
    await connectDB();
    app(req, res);
}