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
                $lte: new Date(new Date(filters.endDate).setHours(23, 59, 59, 999))
            };
        } else if (filters.startDate) {
            query.date = { $gte: new Date(filters.startDate) };
        } else if (filters.endDate) {
            query.date = { $lte: new Date(new Date(filters.endDate).setHours(23, 59, 59, 999)) };
        }

        // Apply specific date filter if provided
        if (filters.specificDate) {
            const startOfDay = new Date(filters.specificDate);
            startOfDay.setHours(0, 0, 0, 0);
            
            const endOfDay = new Date(filters.specificDate);
            endOfDay.setHours(23, 59, 59, 999);
            
            query.date = {
                $gte: startOfDay,
                $lte: endOfDay
            };
        }

        // Apply category filter if provided
        if (filters.category && filters.category !== 'all') {
            query.category = filters.category;
        }

        return await expenseModel.find(query).sort({ date: -1 });
    },

    // Get expenses grouped by day for a specific month
    getExpensesByMonth: async (userId, year, month) => {
        // Month is 0-indexed (0 = January, 11 = December)
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0, 23, 59, 59, 999);

        const expenses = await expenseModel.find({
            userId,
            date: { $gte: firstDay, $lte: lastDay }
        }).sort({ date: 1 });

        // Group expenses by day
        const expensesByDay = {};
        expenses.forEach(expense => {
            const day = new Date(expense.date).getDate();
            if (!expensesByDay[day]) {
                expensesByDay[day] = [];
            }
            expensesByDay[day].push(expense);
        });

        return expensesByDay;
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