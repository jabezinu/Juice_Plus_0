import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({ 
    name: { type: String, required: true, trim: true }, 
    phone: { type: String, required: true, unique: true, trim: true }, 
    image: { type: String, trim: true },
    position: { type: String, required: true, trim: true, enum: ['waiter', 'cashier', 'manager', 'baresta', 'chaf']}, 
    salary: { type: Number, required: true, min: 0 }, 
    dateHired: { type: Date, default: Date.now },
    tableAssigned: {
        type: String,
        required: function() { return this.position === 'waiter'; },
        trim: true,
        default: null
    },
    description: { type: String, trim: true, default: '' },
    workingHour: { type: String, trim: true, default: '' },
    status: { type: String, enum: ['active', 'fired', 'resigned'], default: 'active' },
    reasonForLeaving: { type: String, trim: true, default: '' }
},{
    timestamps: true
});

// Set employee as fired or resigned with a reason
employeeSchema.methods.terminateEmployment = function(status, reason) {
    if (!['fired', 'resigned'].includes(status)) {
        throw new Error('Invalid status. Must be "fired" or "resigned".');
    }
    this.status = status;
    this.reasonForLeaving = reason;
    return this.save();
};

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
