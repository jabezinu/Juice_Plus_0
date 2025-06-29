import express from 'express';
import { createComment, getComments } from '../controller/commentController.js';

const router = express.Router();

// POST /api/comments - Create a new comment
router.post('/', createComment);

// GET /api/comments - Get all comments
router.get('/', getComments);

export default router;
