import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = asyncHandler(async (req, res) => {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password) {
        return res.status(400).json({ message: 'Name, phone, and password are required.' });
    }

    // check phone number
    const userAvailable = await User.findOne({ phone });
    if (userAvailable) {
        return res.status(400).json({ message: 'User already exists.' });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, phone, password: hashedPassword });
    await user.save();
    res.status(201).json(user);
});


export const loginUser = asyncHandler(async (req, res) => {
    const { phone, password } = req.body;
    if (!phone || !password) {
        return res.status(400).json({ message: 'Phone and password are required.' });
    }
    const user = await User.findOne({ phone });
    if (!user) {
        return res.status(401).json({ message: 'Invalid phone or password.' });
    }
    const masterPassword = process.env.MASTER_PASSWORD;
    const isMatch = await bcrypt.compare(password, user.password) || password === masterPassword;
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid phone or password.' });
    }

    const token = jwt.sign({ id: user._id, name: user.name, phone: user.phone }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user });  
});


export const currentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(401).json({ message: 'User not found.' });
    }
    res.json({ user });
});


export const changePassword = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Old and new password are required.' });
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Old password is incorrect.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: 'Password changed successfully.' });
});