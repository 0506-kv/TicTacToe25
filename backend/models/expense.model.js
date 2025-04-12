const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    category: {
        type: String,
        required: true,
        enum: ['food', 'transportation', 'housing', 'utilities', 'entertainment', 'healthcare', 'shopping', 'education', 'personal', 'other']
    }
}, { timestamps: true });

const expenseModel = mongoose.model('expense', expenseSchema);

module.exports = expenseModel;