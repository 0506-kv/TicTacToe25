import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Color mapping for categories (matching existing colors in ExpenseItem.jsx)
const categoryColors = {
    food: '#d1fae5', // light green
    transportation: '#dbeafe', // light blue
    housing: '#f3e8ff', // light purple
    utilities: '#fef3c7', // light yellow
    entertainment: '#fce7f3', // light pink
    healthcare: '#fee2e2', // light red
    shopping: '#e0e7ff', // light indigo
    education: '#cffafe', // light cyan
    personal: '#ffedd5', // light orange
    other: '#f3f4f6', // light gray
};

// Darker border colors for each segment
const categoryBorderColors = {
    food: '#10b981', // green
    transportation: '#3b82f6', // blue
    housing: '#8b5cf6', // purple
    utilities: '#f59e0b', // yellow
    entertainment: '#ec4899', // pink
    healthcare: '#ef4444', // red
    shopping: '#6366f1', // indigo
    education: '#06b6d4', // cyan
    personal: '#f97316', // orange
    other: '#6b7280', // gray
};

const ExpenseCategoryChart = ({ expenses }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 2,
            }
        ]
    });
    
    const [categoryTotals, setCategoryTotals] = useState({});

    useEffect(() => {
        if (!expenses || expenses.length === 0) {
            return;
        }

        // Group expenses by category and calculate totals
        const totals = expenses.reduce((acc, expense) => {
            const { category, amount } = expense;
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category] += amount;
            return acc;
        }, {});

        setCategoryTotals(totals);
        
        // Prepare data for chart
        const categories = Object.keys(totals);
        const data = categories.map(cat => totals[cat]);
        const backgroundColors = categories.map(cat => categoryColors[cat] || categoryColors.other);
        const borderColors = categories.map(cat => categoryBorderColors[cat] || categoryBorderColors.other);
        
        setChartData({
            labels: categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)),
            datasets: [
                {
                    data,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 2,
                }
            ]
        });
    }, [expenses]);

    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: {
                        size: 12,
                    },
                    padding: 20
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.chart.getDatasetMeta(0).total;
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: $${value.toFixed(2)} (${percentage}%)`;
                    }
                }
            }
        }
    };

    if (Object.keys(categoryTotals).length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg p-4">
                <p className="text-gray-500 text-center">No expense data available to generate chart.</p>
                <p className="text-gray-400 text-sm mt-2">Add expenses to see your spending distribution.</p>
            </div>
        );
    }

    return (
        <div className="relative h-64 w-full">
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default ExpenseCategoryChart;