import express from 'express';
import {
    updateMenu,
    deleteMenu,
    getMenusByCategory,
    createMenuUnderCategory
} from '../controller/menuController.js';
import upload from '../config/multer.js';

const router = express.Router();


// Get all menu items by category
router.get('/category/:categoryId', getMenusByCategory);

// Create a new menu item under a category
router.post('/category/:categoryId', upload.single('image'), createMenuUnderCategory);

// Update a menu item
router.put('/:id', upload.single('image'), updateMenu);

// Delete a menu item
router.delete('/:id', deleteMenu);


export default router;
