const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token;

        // Check if token exists
        if (!token) {
            req.flash('error_msg', 'Please log in to access this resource');
            return res.redirect('/login');
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        req.user = await User.findById(decoded.id).select('-password');

        next();
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Not authorized');
        res.redirect('/login');
    }
};