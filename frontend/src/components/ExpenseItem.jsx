import React from 'react';

const categoryColors = {
    food: 'bg-green-100 text-green-800',
    transportation: 'bg-blue-100 text-blue-800',
    housing: 'bg-purple-100 text-purple-800',
    utilities: 'bg-yellow-100 text-yellow-800',
    entertainment: 'bg-pink-100 text-pink-800',
    healthcare: 'bg-red-100 text-red-800',
    shopping: 'bg-indigo-100 text-indigo-800',
    education: 'bg-cyan-100 text-cyan-800',
    personal: 'bg-orange-100 text-orange-800',
    other: 'bg-gray-100 text-gray-800'
};

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
    // Format date as DD/MM/YYYY
    const formattedDate = new Date(expense.date).toLocaleDateString('en-GB');
    const categoryClass = categoryColors[expense.category] || categoryColors.other;

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formattedDate}
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">
                {expense.description}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${categoryClass}`}>
                    {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${expense.amount.toFixed(2)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    onClick={() => onEdit(expense)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(expense._id)}
                    className="text-red-600 hover:text-red-900"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default ExpenseItem;