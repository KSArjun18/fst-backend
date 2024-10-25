const User = require('../models/User');


exports.createEmployee = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, role, employeeId, password } = req.body;
    try {
        let user = await User.findOne({ employeeId });
        if (user) return res.status(400).json({ message: 'Employee already exists' });

        user = new User({ firstName, lastName, email, phoneNumber, role, employeeId, password });
        await user.save();
        res.status(201).json({ message: 'Employee created successfully' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ message: 'Validation failed', errors });
        }
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({ message: `${field} already exists` });
        }
        console.error('Create Employee Error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await User.find({ role: 'Employee' });
        res.json(employees);
    } catch (err) {
        console.error('Get All Employees Error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.editEmployee = async (req, res) => {
    const { employeeId } = req.params;
    const updates = req.body;
    try {
        const employee = await User.findOneAndUpdate({ employeeId }, updates, { new: true, runValidators: true });
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ message: 'Validation failed', errors });
        }
        console.error('Update Employee Error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.deleteEmployee = async (req, res) => {
    const { employeeId } = req.params;
    try {
        const employee = await User.findOneAndDelete({ employeeId });
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        console.error('Delete Employee Error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
