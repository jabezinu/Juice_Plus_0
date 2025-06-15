import Employee from '../models/Employee.js';
import cloudinary from '../config/cloudinary.js';

// Create a new employee
export const createEmployee = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all employees
export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single employee by ID
export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an employee
export const updateEmployee = async (req, res) => {
    try {
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
        const updateData = { ...req.body };
        if (imageUrl) updateData.image = imageUrl;
        const employee = await Employee.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an employee
export const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
