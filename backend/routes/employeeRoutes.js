import express from 'express';
import {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} from '../controller/employeeController.js';
import upload from '../config/multer.js';

const router = express.Router();

// Create a new employee
router.post('/', upload.single('image'), createEmployee);

// Get all employees
router.get('/', getEmployees);

// Get a single employee by ID
router.get('/:id', getEmployeeById);

// Update an employee
router.put('/:id', upload.single('image'), updateEmployee);

// Delete an employee
router.delete('/:id', deleteEmployee);

export default router;
