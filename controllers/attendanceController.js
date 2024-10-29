const Attendance = require('../models/Attendance');
const User = require('../models/User');


const options = { 
    timeZone: 'Asia/Kolkata', 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true 
};


const formatTime = (date) => 
    new Intl.DateTimeFormat('en-US', options).format(date);


const formatDate = (date) => 
    new Intl.DateTimeFormat('en-GB', { 
        timeZone: 'Asia/Kolkata', 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    }).format(date);


    exports.checkIn = async (req, res) => {
        const employeeId = req.user.employeeId;
    
        try {
            const user = await User.findOne({ employeeId });
            if (!user) return res.status(404).json({ message: 'User not found' });
    
            const now = new Date();
            const attendance = new Attendance({ 
                employeeId, 
                firstName: user.firstName,
                checkIn: now,
            });
    
            await attendance.save();
    
            res.status(201).json({ 
                message: 'Check-in successful', 
                attendance: {
                    employeeId: attendance.employeeId,
                    firstName: attendance.firstName,
                    checkIn: formatTime(now),
                    createdAt: formatDate(now),
                } 
            });
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
    
            const now = new Date();
            attendance.checkOut = now;
            await attendance.save();
    
            res.json({ 
                message: 'Check-out successful', 
                attendance: {
                    employeeId: attendance.employeeId,
                    checkIn: formatTime(attendance.checkIn),
                    checkOut: formatTime(now),
                    createdAt: formatDate(attendance.createdAt),
                } 
            });
        } catch (error) {
            console.error('Check-Out Error:', error.message);
            res.status(500).json({ message: 'Server error' });
        }
    };
    



