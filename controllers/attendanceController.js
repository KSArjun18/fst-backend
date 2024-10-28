const Attendance = require('../models/Attendance');
const User = require('../models/User');
exports.checkIn = async (req, res) => {
    const employeeId = req.user.employeeId;

    try {
        const user = await User.findOne({ employeeId }); // Get user information
        if (!user) return res.status(404).json({ message: 'User not found' });

        const attendance = new Attendance({ 
            employeeId, 
            firstName: user.firstName, // Include firstName
            checkIn: new Date() 
        });
        await attendance.save();
        res.status(201).json({ message: 'Check-in successful', attendance });
    } catch (error) {
        console.error('Check-In Error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.checkOut = async (req, res) => {
    const employeeId = req.user.employeeId;

    try {
        const attendance = await Attendance.findOne({ employeeId, checkOut: null });
        if (!attendance) return res.status(404).json({ message: 'No check-in record found' });

        attendance.checkOut = new Date();
        await attendance.save();
        res.json({ message: 'Check-out successful', attendance });
    } catch (error) {
        console.error('Check-Out Error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
