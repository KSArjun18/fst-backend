const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: { type: String, required: true },
    firstName: { type: String, required: true },
    checkIn: { type: Date },
    checkOut: { type: Date },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Attendance', attendanceSchema);
