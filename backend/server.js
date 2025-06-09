import express from 'express';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employeeRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());


// Employee API routes
app.use('/api/employees', employeeRoutes);
// Menu API routes
app.use('/api/menus', menuRoutes);

// MongoDB connection
const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
