import asyncHandler from 'express-async-handler';
import Menu from '../models/Menu.js';
import cloudinary from '../config/cloudinary.js';

// Update a menu item
export const updateMenu = asyncHandler(async (req, res) => {
    let imageUrl = req.body.image;
    if (req.file) {
        await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return reject(error);
                }
                imageUrl = result.secure_url;
                resolve();
            });
            stream.end(req.file.buffer);
        });
    }
    const updateData = { ...req.body };
    // If image is explicitly set to empty string, remove image
    if (req.body.image === '') {
        updateData.image = '';
    } else if (imageUrl) {
        updateData.image = imageUrl;
    }
    const menu = await Menu.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!menu) return res.status(404).json({ message: 'Menu item not found' });
    res.json(menu);
});

// Delete a menu item
export const deleteMenu = asyncHandler(async (req, res) => {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menu item not found' });
    res.json({ message: 'Menu item deleted' });
});

// Get all menu items by category
export const getMenusByCategory = asyncHandler(async (req, res) => {
    const menus = await Menu.find({ category: req.params.categoryId });
    res.json(menus);
});

// Create a new menu item under a category
export const createMenuUnderCategory = asyncHandler(async (req, res) => {
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
    // Ensure category is set from params
    const menu = new Menu({ ...req.body, image: imageUrl, category: req.params.categoryId });
    await menu.save();
    res.status(201).json(menu);
});
