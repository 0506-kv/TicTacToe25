const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Show home page
// @route   GET /
exports.getIndex = (req, res) => {
    res.render('index', {
        title: 'Welcome'
    });
};

// @desc    Show register page
// @route   GET /register
exports.getRegister = (req, res) => {
    res.render('register', {
        title: 'Register'
    });
};

// @desc    Register a user
// @route   POST /register
exports.registerUser = async (req, res) => {
    const { name, email, password, password2 } = req.body;

    // Simple validation
    const errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
        return res.render('register', {
            title: 'Register',
            errors,
            name,
            email,
            password,
            password2
        });
    }

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            errors.push({ msg: 'Email is already registered' });
            return res.render('register', {
                title: 'Register',
                errors,
                name,
                email,
                password,
                password2
            });
        }

        // Create new user
        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Server error');
        res.redirect('/register');
    }
};

// @desc    Show login page
// @route   GET /login
exports.getLogin = (req, res) => {
    res.render('login', {
        title: 'Login'
    });
};

// @desc    Login user
// @route   POST /login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for user
        const user = await User.findOne({ email });

        if (!user) {
            req.flash('error_msg', 'Invalid email or password');
            return res.redirect('/login');
        }

        // Match password
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            req.flash('error_msg', 'Invalid email or password');
            return res.redirect('/login');
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        // Set cookie
        res.cookie('token', token, { httpOnly: true });

        req.flash('success_msg', 'You are now logged in');
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Server error');
        res.redirect('/login');
    }
};

// @desc    Dashboard
// @route   GET /dashboard
exports.getDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.render('dashboard', {
            title: 'Dashboard',
            user
        });
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
};

// @desc    Logout user
// @route   GET /logout
exports.logout = (req, res) => {
    res.clearCookie('token');
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
};