import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, enum: ['Drink', 'Food', 'Fruit'] }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
