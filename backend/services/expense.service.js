const expenseModel = require('../models/expense.model');

module.exports = {
    createExpense: async (expenseData) => {
        if (!expenseData.amount || !expenseData.description || !expenseData.category) {
            throw new Error('Missing required fields');
        }

        return await expenseModel.create(expenseData);
    },

    getExpenses: async (userId, filters = {}) => {
        const query = { userId };

        // Apply date filter if provided
        if (filters.startDate && filters.endDate) {
            query.date = {
                $gte: new Date(filters.startDate),
                $lte: new Date(filters.endDate)
            };
        }

        // Apply category filter if provided
        if (filters.category) {
            query.category = filters.category;
        }

        return await expenseModel.find(query).sort({ date: -1 });
    },

    getExpenseById: async (expenseId, userId) => {
        return await expenseModel.findOne({ _id: expenseId, userId });
    },

    updateExpense: async (expenseId, userId, updateData) => {
        return await expenseModel.findOneAndUpdate(
            { _id: expenseId, userId },
            updateData,
            { new: true, runValidators: true }
        );
    },

    deleteExpense: async (expenseId, userId) => {
        return await expenseModel.findOneAndDelete({ _id: expenseId, userId });
    }
};