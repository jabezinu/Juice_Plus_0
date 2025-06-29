import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';

// Create a new category
export const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
});

// Get all categories
export const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
});

// Update a category by ID
export const updateCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
});

// Delete a category by ID
export const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category deleted' });
});
