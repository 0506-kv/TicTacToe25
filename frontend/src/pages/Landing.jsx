import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Landing = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
                <h1 className="text-5xl font-bold mb-4">Welcome to TicTacToe25</h1>
                <p className="text-xl mb-8 max-w-2xl text-center">
                    Play the classic Tic-Tac-Toe game with a twist! Connect with friends and challenge them to a match.
                </p>

                <div className="flex space-x-4">
                    <Link
                        to="/register"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-lg"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/login"
                        className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium text-lg"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Landing;