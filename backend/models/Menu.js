import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    ingredients: [{ type: String, trim: true }],
    price: { type: Number, required: true, min: 0 },
    image: { type: String, trim: true },
    available: { type: Boolean, default: true },
    badge: { type: String, trim: true, enum: ['New', 'Popular', 'Recommended', 'Vegan', ''] },
    section: { type: String, required: true, enum: ['Drink', 'Food', 'Fruit'] },
}, {
    timestamps: true
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
