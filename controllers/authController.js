const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { employeeId, password } = req.body;
    try {
        const user = await User.findOne({ employeeId });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            employeeId: user.employeeId
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error("Login error: ", error.message);
        res.status(500).json({ message: 'Server error' });
    }
    
};
