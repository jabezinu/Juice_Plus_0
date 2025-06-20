import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import employeeRoutes from './routes/employeeRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// Employee API routes, Menu API routes, Category API routes, User API routes
app.use('/api/employees', employeeRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

// // MongoDB connection
// const PORT = process.env.PORT || 5000;

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URL);
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error('MongoDB connection error:', error);
//         process.exit(1);
//     }
// };

// connectDB().then(() => {
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });


// Database connection (for Vercel serverless)
let isConnected = false;

async function connectDB() {
    if (isConnected) return;
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
}

export default async function handler(req, res) {
    await connectDB();
    app(req, res);
}