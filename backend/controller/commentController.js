import Comment from '../models/Comment.js';

// Create a new comment
export const createComment = async (req, res) => {
  try {
    let { name, phone, comment, anonymous } = req.body;
    anonymous = !!anonymous;
    // Validation: if not anonymous, name and phone are required
    if (!anonymous) {
      if (!name || !phone) {
        return res.status(400).json({ success: false, message: 'Name and phone are required if not anonymous.' });
      }
    } else {
      name = '';
      phone = '';
    }
    const newComment = new Comment({
      name,
      phone,
      comment,
      anonymous,
    });
    await newComment.save();
    res.status(201).json({ success: true, message: 'Comment submitted successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit comment', error: error.message });
  }
};

// Get all comments
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch comments', error: error.message });
  }
};
