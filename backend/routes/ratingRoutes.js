import express from 'express';
import { createRating, getRatingsForMenu, getAverageRating } from '../controller/ratingController.js';

const router = express.Router();

// Create a new rating
router.post('/', createRating);

// Get all ratings for a menu item
router.get('/menu/:menuId', getRatingsForMenu);

// Get average rating for a menu item
router.get('/menu/:menuId/average', getAverageRating);

export default router;
