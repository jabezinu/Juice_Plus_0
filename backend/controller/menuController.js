import Menu from '../models/Menu.js';

// Create a new menu item
export const createMenu = async (req, res) => {
    try {
        const menu = new Menu(req.body);
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
        const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
        const menu = new Menu({ ...req.body, category: req.params.categoryId });
        await menu.save();
        res.status(201).json(menu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
