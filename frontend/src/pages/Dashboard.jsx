import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await authService.getProfile();
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="container mx-auto p-6 flex justify-center items-center h-screen">
                    <p className="text-xl">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-6">Welcome to your dashboard, {user?.username}!</h1>
                    <p className="mb-4">This is your TicTacToe25 dashboard. Here you can:</p>
                    <ul className="list-disc pl-6 mb-6">
                        <li>Start a new game</li>
                        <li>View your game history</li>
                        <li>Connect with friends</li>
                    </ul>

                    <div className="bg-blue-100 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Ready to play?</h2>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                            Start New Game
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;