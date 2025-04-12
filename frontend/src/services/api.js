import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    register: async (userData) => {
        const response = await api.post('/users/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/users/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    logout: async () => {
        await api.get('/users/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getProfile: async () => {
        return await api.get('/users/profile');
    }
};

export const expenseService = {
    getExpenses: async (filters = {}) => {
        const queryParams = new URLSearchParams();
        if (filters.startDate) queryParams.append('startDate', filters.startDate);
        if (filters.endDate) queryParams.append('endDate', filters.endDate);
        if (filters.category) queryParams.append('category', filters.category);

        return await api.get(`/expenses?${queryParams.toString()}`);
    },

    getExpenseById: async (id) => {
        return await api.get(`/expenses/${id}`);
    },

    createExpense: async (expenseData) => {
        return await api.post('/expenses', expenseData);
    },

    updateExpense: async (id, expenseData) => {
        return await api.put(`/expenses/${id}`, expenseData);
    },

    deleteExpense: async (id) => {
        return await api.delete(`/expenses/${id}`);
    }
};