import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name: { type: String, default: '' },          // Optional, validated in controller
  phone: { type: String, default: '' },         // Optional, validated in controller
  comment: { type: String, required: true },    // Required
  anonymous: { type: Boolean, default: false }, // Optional
  createdAt: { type: Date, default: Date.now }  // Timestamp
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
