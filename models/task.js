const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    employeeId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    problems: { type: String, required: true },
    firstName: { type: String, required: true },
    time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
