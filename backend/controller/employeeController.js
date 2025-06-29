import asyncHandler from 'express-async-handler';
import Employee from '../models/Employee.js';
import cloudinary from '../config/cloudinary.js';

// Create a new employee
export const createEmployee = asyncHandler(async (req, res) => {
    let imageUrl = req.body.image;
    if (req.file) {
        await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) return reject(error);
                imageUrl = result.secure_url;
                resolve();
            });
            stream.end(req.file.buffer);
        });
    }
    const employee = new Employee({ ...req.body, image: imageUrl });
    await employee.save();
    res.status(201).json(employee);
});

// Get all employees
export const getEmployees = asyncHandler(async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
});

// Get a single employee by ID
export const getEmployeeById = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
});

// Update an employee
export const updateEmployee = asyncHandler(async (req, res) => {
    let imageUrl = req.body.image;
    if (req.file) {
        await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) return reject(error);
                imageUrl = result.secure_url;
                resolve();
            });
            stream.end(req.file.buffer);
        });
    }
    const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        { ...req.body, image: imageUrl },
        { new: true, runValidators: true }
    );
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
});

// Delete an employee
export const deleteEmployee = asyncHandler(async (req, res) => {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
});
