const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const expenseController = require('../controllers/expense.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Apply auth middleware to all expense routes
router.use(authMiddleware.authUser);

// Create expense
router.post('/', [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('date').optional().isDate().withMessage('Invalid date format'),
    body('category').isIn(['food', 'transportation', 'housing', 'utilities', 'entertainment', 'healthcare', 'shopping', 'education', 'personal', 'other'])
        .withMessage('Invalid category')
], expenseController.createExpense);

// Get all expenses (with optional filters)
router.get('/', expenseController.getExpenses);

// Get expense by ID
router.get('/:id', expenseController.getExpenseById);

// Update expense
router.put('/:id', [
    body('amount').optional().isNumeric().withMessage('Amount must be a number'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
    body('date').optional().isDate().withMessage('Invalid date format'),
    body('category').optional().isIn(['food', 'transportation', 'housing', 'utilities', 'entertainment', 'healthcare', 'shopping', 'education', 'personal', 'other'])
        .withMessage('Invalid category')
], expenseController.updateExpense);

// Delete expense
router.delete('/:id', expenseController.deleteExpense);

// Get expenses by month
router.get('/month/:year/:month', expenseController.getExpensesByMonth);

module.exports = router;