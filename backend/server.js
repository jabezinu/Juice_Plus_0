import express from 'express';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employeeRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';
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

// MongoDB connection
const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
