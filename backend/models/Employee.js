import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({ 
    name: { type: String, required: true, trim: true }, 
    phone: { type: String, required: true, unique: true, trim: true }, 
    position: { type: String, required: true, trim: true, enum: ['waiter', 'cashier', 'manager', 'baresta', 'chaf']}, 
    salary: { type: Number, required: true, min: 0 }, 
    dateHired: { type: Date, default: Date.now } 
},{
    timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
