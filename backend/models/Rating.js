import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  menu: {type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
  stars: {type: Number, required: true, min: 1, max: 5 },
}, { 
    timestamps: true 
});

const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;
