const expenseService = require('../services/expense.service');
const { validationResult } = require('express-validator');

module.exports = {
    createExpense: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            const expenseData = {
                ...req.body,
                userId: req.user._id
            };
            
            const expense = await expenseService.createExpense(expenseData);
            res.status(201).json(expense);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    getExpenses: async (req, res) => {
        try {
            const filters = {
                startDate: req.query.startDate,
                endDate: req.query.endDate,
                category: req.query.category
            };
            
            const expenses = await expenseService.getExpenses(req.user._id, filters);
            res.json(expenses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    getExpenseById: async (req, res) => {
        try {
            const expense = await expenseService.getExpenseById(req.params.id, req.user._id);
            
            if (!expense) {
                return res.status(404).json({ message: 'Expense not found' });
            }
            
            res.json(expense);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    updateExpense: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            const expense = await expenseService.updateExpense(
                req.params.id,
                req.user._id,
                req.body
            );
            
            if (!expense) {
                return res.status(404).json({ message: 'Expense not found' });
            }
            
            res.json(expense);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    
    deleteExpense: async (req, res) => {
        try {
            const expense = await expenseService.deleteExpense(req.params.id, req.user._id);
            
            if (!expense) {
                return res.status(404).json({ message: 'Expense not found' });
            }
            
            res.json({ message: 'Expense deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};