import React from 'react';

const MonthCard = ({ name, expenses = [], onClick }) => {
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalCount = expenses.length;
    
    // Define color intensity based on expense amount
    // We'll use a simple linear scale: more expenses = darker blue
    let colorClass = "bg-white";
    
    if (totalCount > 0) {
        if (totalAmount > 1000) {
            colorClass = "bg-blue-200";
        } else if (totalAmount > 500) {
            colorClass = "bg-blue-100";
        } else {
            colorClass = "bg-blue-50";
        }
    }

    return (
        <div 
            className={`${colorClass} rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-lg transform hover:-translate-y-1`}
            onClick={onClick}
        >
            <h3 className="font-bold text-xl mb-3">{name}</h3>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{totalCount} expenses</span>
                <span className="font-semibold text-lg">${totalAmount.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default MonthCard;