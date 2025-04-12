import React, { useState, useEffect } from 'react';
import MonthCard from './MonthCard';
import MonthDetail from './MonthDetail';
import DayDetail from './DayDetail';
import { expenseService } from '../services/api';

const CalendarView = () => {
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [yearExpenses, setYearExpenses] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const currentYear = new Date().getFullYear();

    // Month names array
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        fetchYearExpenses();
    }, []);

    const fetchYearExpenses = async () => {
        try {
            setLoading(true);
            const startDate = `${currentYear}-01-01`;
            const endDate = `${currentYear}-12-31`;
            
            const response = await expenseService.getExpenses({
                startDate,
                endDate
            });
            
            // Group expenses by month
            const expensesByMonth = {};
            response.data.forEach(expense => {
                const date = new Date(expense.date);
                const month = date.getMonth(); // 0-11
                
                if (!expensesByMonth[month]) {
                    expensesByMonth[month] = [];
                }
                expensesByMonth[month].push(expense);
            });
            
            setYearExpenses(expensesByMonth);
        } catch (err) {
            setError('Failed to fetch expenses');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleMonthClick = (monthIndex) => {
        setSelectedMonth(monthIndex);
        setSelectedDate(null);
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleBackToMonths = () => {
        setSelectedMonth(null);
        setSelectedDate(null);
    };

    const handleBackToDays = () => {
        setSelectedDate(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            {selectedDate ? (
                <DayDetail 
                    date={selectedDate} 
                    expenses={yearExpenses[selectedMonth]?.filter(expense => {
                        const expenseDate = new Date(expense.date);
                        return expenseDate.getDate() === selectedDate;
                    })}
                    onBack={handleBackToDays}
                    monthName={months[selectedMonth]}
                />
            ) : selectedMonth !== null ? (
                <MonthDetail
                    month={selectedMonth}
                    year={currentYear}
                    expenses={yearExpenses[selectedMonth] || []}
                    onDateClick={handleDateClick}
                    onBack={handleBackToMonths}
                />
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-6">Expense Calendar {currentYear}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {months.map((name, index) => (
                            <MonthCard
                                key={index}
                                name={name}
                                expenses={yearExpenses[index] || []}
                                onClick={() => handleMonthClick(index)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CalendarView;