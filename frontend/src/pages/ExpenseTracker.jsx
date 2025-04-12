import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseCategoryChart from '../components/ExpenseCategoryChart'; // Import the new component
import { expenseService } from '../services/api';

const CATEGORIES = [
    'all', 'food', 'transportation', 'housing', 'utilities',
    'entertainment', 'healthcare', 'shopping', 'education', 'personal', 'other'
];

const ExpenseTracker = () => {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null);
    const [filters, setFilters] = useState({
        category: 'all',
        startDate: '',
        endDate: ''
    });
    // New state for toggling between chart and list views on mobile
    const [activeView, setActiveView] = useState('list'); // 'list' or 'chart'

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
            return;
        }

        fetchExpenses();
    }, [navigate, filters]);

    const fetchExpenses = async () => {
        try {
            setLoading(true);

            const filterParams = {};
            if (filters.category && filters.category !== 'all') {
                filterParams.category = filters.category;
            }
            if (filters.startDate) filterParams.startDate = filters.startDate;
            if (filters.endDate) filterParams.endDate = filters.endDate;

            const response = await expenseService.getExpenses(filterParams);
            setExpenses(response.data);
        } catch (err) {
            setError('Failed to fetch expenses');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddExpense = async (expenseData) => {
        try {
            await expenseService.createExpense(expenseData);
            setShowForm(false);
            fetchExpenses();
        } catch (err) {
            setError('Failed to add expense');
            console.error(err);
        }
    };

    const handleUpdateExpense = async (id, expenseData) => {
        try {
            await expenseService.updateExpense(id, expenseData);
            setShowForm(false);
            setCurrentExpense(null);
            fetchExpenses();
        } catch (err) {
            setError('Failed to update expense');
            console.error(err);
        }
    };

    const handleDeleteExpense = async (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            try {
                await expenseService.deleteExpense(id);
                fetchExpenses();
            } catch (err) {
                setError('Failed to delete expense');
                console.error(err);
            }
        }
    };

    const handleEditClick = (expense) => {
        setCurrentExpense(expense);
        setShowForm(true);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleClearFilters = () => {
        setFilters({
            category: 'all',
            startDate: '',
            endDate: ''
        });
    };
    
    // Calculate total expenses
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="container mx-auto p-4 md:p-6 max-w-5xl">
                <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Expense Tracker</h1>

                        <button
                            onClick={() => {
                                setCurrentExpense(null);
                                setShowForm(!showForm);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            {showForm ? 'Cancel' : 'Add Expense'}
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {showForm && (
                        <ExpenseForm
                            onSubmit={currentExpense ?
                                data => handleUpdateExpense(currentExpense._id, data) :
                                handleAddExpense}
                            initialData={currentExpense}
                        />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Summary Card */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm border border-blue-200">
                            <h2 className="text-lg font-semibold mb-2 text-blue-800">Total Expenses</h2>
                            <p className="text-3xl font-bold text-blue-700">${totalExpenses.toFixed(2)}</p>
                            <p className="text-sm text-blue-600 mt-1">
                                {expenses.length} {expenses.length === 1 ? 'transaction' : 'transactions'}
                            </p>
                        </div>

                        {/* View Toggle for Mobile (only visible on small screens) */}
                        <div className="md:hidden bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between">
                            <button 
                                onClick={() => setActiveView('list')}
                                className={`px-4 py-2 rounded-md flex-1 mr-2 ${activeView === 'list' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 text-gray-700'}`}
                            >
                                List View
                            </button>
                            <button 
                                onClick={() => setActiveView('chart')}
                                className={`px-4 py-2 rounded-md flex-1 ${activeView === 'chart' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 text-gray-700'}`}
                            >
                                Chart View
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Filters</h2>
                            <button
                                onClick={handleClearFilters}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-sm font-medium flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Clear Filters
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="category"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {CATEGORIES.map(category => (
                                        <option key={category} value={category}>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={filters.startDate}
                                    onChange={handleFilterChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={filters.endDate}
                                    onChange={handleFilterChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Responsive grid layout for chart and table */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Chart Section - Always visible on desktop, conditionally on mobile */}
                        <div className={`lg:col-span-2 ${activeView === 'chart' || window.innerWidth >= 1024 ? 'block' : 'hidden'}`}>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 lg:mb-0">
                                <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
                                <ExpenseCategoryChart expenses={expenses} />
                                <p className="text-xs text-gray-500 text-center mt-4">
                                    Hover over chart segments to see details
                                </p>
                            </div>
                        </div>

                        {/* Expense List - Always visible on desktop, conditionally on mobile */}
                        <div className={`lg:col-span-3 ${activeView === 'list' || window.innerWidth >= 1024 ? 'block' : 'hidden'}`}>
                            <ExpenseList
                                expenses={expenses}
                                loading={loading}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteExpense}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseTracker;