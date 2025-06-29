import asyncHandler from 'express-async-handler';
import Rating from '../models/Rating.js';

// Create a new rating
export const createRating = asyncHandler(async (req, res) => {
  const { menu, stars, comment, user } = req.body;
  if (!menu || !stars) {
    return res.status(400).json({ message: 'Menu and stars are required.' });
  }
  const rating = new Rating({ menu, stars, comment, user });
  await rating.save();
  res.status(201).json(rating);
});

// Get all ratings for a menu item
export const getRatingsForMenu = asyncHandler(async (req, res) => {
  const { menuId } = req.params;
  const ratings = await Rating.find({ menu: menuId });
  res.json(ratings);
});

// Optionally: Get average rating for a menu item
export const getAverageRating = asyncHandler(async (req, res) => {
  const { menuId } = req.params;
  const result = await Rating.aggregate([
    { $match: { menu: require('mongoose').Types.ObjectId(menuId) } },
    { $group: { _id: '$menu', avgRating: { $avg: '$stars' }, count: { $sum: 1 } } }
  ]);
  if (result.length === 0) {
    return res.json({ avgRating: 0, count: 0 });
  }
  res.json(result[0]);
});
