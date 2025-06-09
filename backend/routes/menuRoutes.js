import express from 'express';
import {
    createMenu,
    getMenus,
    getMenuById,
    updateMenu,
    deleteMenu
} from '../controller/menuController.js';

const router = express.Router();

// Create a new menu item
router.post('/', createMenu);

// Get all menu items
router.get('/', getMenus);

// Get a single menu item by ID
router.get('/:id', getMenuById);

// Update a menu item
router.put('/:id', updateMenu);

// Delete a menu item
router.delete('/:id', deleteMenu);

export default router;
