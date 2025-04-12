import React, { useMemo } from 'react';

const MonthDetail = ({ month, year, expenses = [], onDateClick, onBack }) => {
    const monthName = useMemo(() => {
        const date = new Date(year, month, 1);
        return date.toLocaleString('default', { month: 'long' });
    }, [month, year]);
    
    // Calculate days in month
    const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [month, year]);
    
    // Get first day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfMonth = useMemo(() => new Date(year, month, 1).getDay(), [month, year]);
    
    // Group expenses by day
    const expensesByDay = useMemo(() => {
        const grouped = {};
        
        expenses.forEach(expense => {
            const day = new Date(expense.date).getDate();
            if (!grouped[day]) {
                grouped[day] = [];
            }
            grouped[day].push(expense);
        });
        
        return grouped;
    }, [expenses]);
    
    // Find max daily expense total for color scaling
    const maxDailyTotal = useMemo(() => {
        let max = 0;
        Object.values(expensesByDay).forEach(dayExpenses => {
            const total = dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
            if (total > max) max = total;
        });
        return max;
    }, [expensesByDay]);
    
    // Generate calendar days
    const calendarDays = useMemo(() => {
        const days = [];
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        // Add day headers
        dayNames.forEach(name => {
            days.push({ type: 'header', name });
        });
        
        // Add empty cells for days before the 1st of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push({ type: 'empty' });
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayExpenses = expensesByDay[day] || [];
            const totalAmount = dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
            
            // Determine cell color based on expense amount
            let colorClass = "bg-white";
            
            if (dayExpenses.length > 0) {
                const intensity = Math.min(1, totalAmount / (maxDailyTotal || 1));
                
                if (intensity > 0.7) {
                    colorClass = "bg-green-600 text-white";
                } else if (intensity > 0.4) {
                    colorClass = "bg-green-500 text-white";
                } else if (intensity > 0.2) {
                    colorClass = "bg-green-400";
                } else if (intensity > 0.1) {
                    colorClass = "bg-green-300";
                } else {
                    colorClass = "bg-green-200";
                }
            }
            
            days.push({ 
                type: 'day', 
                day, 
                expenses: dayExpenses,
                totalAmount,
                colorClass
            });
        }
        
        return days;
    }, [daysInMonth, firstDayOfMonth, expensesByDay, maxDailyTotal]);
    
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
                    Back to months
                </button>
                <h2 className="text-2xl font-bold">{monthName} {year}</h2>
                <div></div> {/* Spacer for flex alignment */}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((item, index) => {
                    if (item.type === 'header') {
                        return (
                            <div key={index} className="p-2 text-center font-bold text-gray-600">
                                {item.name}
                            </div>
                        );
                    } else if (item.type === 'empty') {
                        return <div key={index} className="p-4"></div>;
                    } else {
                        return (
                            <div 
                                key={index} 
                                className={`${item.colorClass} p-4 rounded-lg min-h-24 cursor-pointer transition-transform hover:scale-95`}
                                onClick={() => onDateClick(item.day)}
                            >
                                <div className="flex justify-between items-start">
                                    <span className="font-bold">{item.day}</span>
                                    {item.expenses.length > 0 && (
                                        <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                            {item.expenses.length}
                                        </span>
                                    )}
                                </div>
                                {item.expenses.length > 0 && (
                                    <div className="mt-2 text-sm font-semibold">
                                        ${item.totalAmount.toFixed(2)}
                                    </div>
                                )}
                            </div>
                        );
                    }
                })}
            </div>
            
            <div className="mt-6 flex justify-between text-sm text-gray-600">
                <div>Total: {expenses.length} expenses</div>
                <div>
                    Total Amount: ${expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default MonthDetail;