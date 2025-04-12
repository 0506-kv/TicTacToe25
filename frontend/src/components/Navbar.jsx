import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="bg-gray-800 text-white px-6 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">TicTacToe25</Link>

                <div className="hidden md:flex space-x-6">
                    {user && (
                        <>
                            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
                            <Link to="/expenses" className="hover:text-gray-300">Expense Tracker</Link>
                        </>
                    )}
                </div>

                <div className="space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="mr-2 hidden md:inline">Welcome, {user.username}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-gray-300">Login</Link>
                            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;