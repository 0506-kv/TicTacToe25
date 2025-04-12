const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');


//ALL ROUTES
const userRoutes = require('./routes/user.routes');
const expenseRoutes = require('./routes/expense.routes');  // Add this line


connectToDb();

// Updated CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL, // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('hello world');
});


app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);  // Add this line


module.exports = app;