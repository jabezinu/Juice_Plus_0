import Menu from '../models/Menu.js';
import cloudinary from '../config/cloudinary.js';

// Create a new menu item
export const createMenu = async (req, res) => {
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
        const menu = new Menu({ ...req.body, image: imageUrl });
        await menu.save();
        res.status(201).json(menu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all menu items
export const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single menu item by ID
export const getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) return res.status(404).json({ message: 'Menu item not found' });
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a menu item
export const updateMenu = async (req, res) => {
    try {
        let imageUrl = req.body.image;
        if (req.file) {
            await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (error) return reject(error);
                    imageUrl = result.secure_url;
                    resolve();
                });
                stream.end(req.file.buffer);
            });
        }
        const updateData = { ...req.body };
        if (imageUrl) updateData.image = imageUrl;
        const menu = await Menu.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!menu) return res.status(404).json({ message: 'Menu item not found' });
        res.json(menu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a menu item
export const deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findByIdAndDelete(req.params.id);
        if (!menu) return res.status(404).json({ message: 'Menu item not found' });
        res.json({ message: 'Menu item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all menu items by category
export const getMenusByCategory = async (req, res) => {
    try {
        const menus = await Menu.find({ category: req.params.categoryId });
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new menu item under a category
export const createMenuUnderCategory = async (req, res) => {
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
        const menu = new Menu({ ...req.body, category: req.params.categoryId, image: imageUrl });
        await menu.save();
        res.status(201).json(menu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
