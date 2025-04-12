import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 60) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav 
            className={`fixed w-full z-40 transition-all duration-300 ${
                scrolled 
                ? 'py-2 backdrop-blur-lg bg-blue-900/90 shadow-lg' 
                : 'py-6 backdrop-blur-lg bg-blue-900/90 shadow-lg'
            }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                <Link 
                    to="/" 
                    className="text-xl md:text-2xl font-bold flex items-center group"
                >
                    <div className="relative w-9 h-9 flex items-center justify-center mr-2 overflow-hidden">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-7 w-7 text-emerald-400 group-hover:scale-110 transition-transform duration-300" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                            />
                        </svg>
                        <div className="absolute inset-0 rounded-full bg-emerald-500/20 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    </div>
                    <div className="relative">
                        <span className="text-white">Finance<span className="text-emerald-400 font-extrabold">Tracker</span></span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {user && (
                        <>
                            <Link 
                                to="/dashboard" 
                                className="text-white font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-emerald-400 after:transition-all after:duration-300 hover:after:w-full"
                            >
                                Dashboard
                            </Link>
                            <Link 
                                to="/expenses" 
                                className="text-white font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-emerald-400 after:transition-all after:duration-300 hover:after:w-full"
                            >
                                Expense Tracker
                            </Link>
                        </>
                    )}

                    <div className="space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-emerald-200 font-medium">Hi, {user.username}!</span>
                                <button
                                    onClick={handleLogout}
                                    className="relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2 rounded-lg font-medium overflow-hidden group"
                                >
                                    <span className="relative z-10 flex items-center">
                                        Logout
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 w-3 bg-white opacity-10 transform -skew-x-20 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-700"></div>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link 
                                    to="/login" 
                                    className="text-white hover:text-emerald-300 px-3 py-2 rounded-lg transition-colors duration-300 flex items-center"
                                >
                                    <span className="mr-1">Login</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="relative overflow-hidden inline-flex items-center bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-5 py-2 rounded-lg font-medium group"
                                >
                                    <span className="flex items-center">
                                        Sign Up Free
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 w-3 bg-white opacity-10 transform -skew-x-20 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-700"></div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden focus:outline-none text-white z-50"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    <div className="w-8 h-6 flex flex-col justify-between overflow-hidden">
                        <span className={`w-full h-1 bg-white rounded transform transition-all duration-300 ${mobileMenuOpen ? 'translate-y-2.5 rotate-45' : ''}`}></span>
                        <span className={`w-full h-1 bg-white rounded transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`w-full h-1 bg-white rounded transform transition-all duration-300 ${mobileMenuOpen ? '-translate-y-2.5 -rotate-45' : ''}`}></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            <div 
                className={`fixed inset-0 z-30 bg-gradient-to-b from-blue-900 to-blue-950 transition-all duration-500 ${
                    mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                } md:hidden pt-24`}
            >
                <div className="container mx-auto px-6 py-8 flex flex-col space-y-8 items-center">
                    {user && (
                        <>
                            <Link 
                                to="/dashboard" 
                                className="text-white text-2xl font-medium relative w-full text-center py-3 after:absolute after:bottom-0 after:left-1/4 after:right-1/4 after:h-[1px] after:bg-emerald-400 after:transition-all after:duration-300"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link 
                                to="/expenses" 
                                className="text-white text-2xl font-medium relative w-full text-center py-3 after:absolute after:bottom-0 after:left-1/4 after:right-1/4 after:h-[1px] after:bg-emerald-400 after:transition-all after:duration-300"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Expense Tracker
                            </Link>
                        </>
                    )}
                    {user ? (
                        <div className="flex flex-col items-center space-y-6 w-full">
                            <span className="text-emerald-200 text-xl">Welcome, {user.username}</span>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMobileMenuOpen(false);
                                }}
                                className="w-3/4 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-8 rounded-lg text-center text-lg font-medium"
                            >
                                <span className="flex items-center justify-center">
                                    Logout
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-6 w-full">
                            <Link 
                                to="/login" 
                                className="w-3/4 border border-white text-white py-3 px-8 rounded-lg text-center text-lg transition-colors duration-300 hover:bg-white hover:text-blue-900 flex items-center justify-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span>Login</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </Link>
                            <Link 
                                to="/register" 
                                className="w-3/4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-8 rounded-lg text-center text-lg font-medium flex items-center justify-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span>Sign Up Free</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;