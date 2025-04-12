import React from 'react';
import ExpenseItem from './ExpenseItem';

const DayDetail = ({ date, monthName, expenses = [], onBack }) => {
    const formattedDate = new Date(new Date().getFullYear(), new Date().getMonth(), date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
                <button 
                    onClick={onBack} 
                    className="flex items-center text-blue-600 hover:text-blue-800"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to {monthName}
                </button>
                <h2 className="text-2xl font-bold">{formattedDate}</h2>
                <div></div> {/* Spacer for flex alignment */}
            </div>
            
            <div className="mb-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium">Total Expenses</span>
                    <span className="text-xl font-bold">${totalAmount.toFixed(2)}</span>
                </div>
            </div>
            
            {expenses.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {expenses.map((expense) => (
                                <tr key={expense._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {expense.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${expense.category}-100 text-${expense.category}-800`}>
                                            {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ${expense.amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No expenses recorded for this day.</p>
                </div>
            )}
        </div>
    );
};

export default DayDetail;