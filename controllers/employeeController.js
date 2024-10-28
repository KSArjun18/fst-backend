const User = require('../models/User');

// Helper function to generate the next employee ID
const generateEmployeeId = async () => {
    const lastEmployee = await User.findOne({ employeeId: { $regex: /^FST\d{3}$/ } })
        .sort({ employeeId: -1 }); // Find the latest employee by ID

    if (!lastEmployee) {
        return 'FST001'; // Start from FST001 if no employees exist
    }

    // Extract the numeric part and increment it
    const lastIdNum = parseInt(lastEmployee.employeeId.substring(3), 10);
    const nextIdNum = lastIdNum + 1;

    // Pad the number with leading zeros if needed (e.g., 002, 012)
    const nextId = `FST${String(nextIdNum).padStart(3, '0')}`;
    return nextId;
};

exports.createEmployee = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, role, password } = req.body;
    try {
        const employeeId = await generateEmployeeId(); // Generate the new employee ID

        const user = new User({ firstName, lastName, email, phoneNumber, role, employeeId, password });
        await user.save();

        res.status(201).json({ message: 'Employee created successfully', employeeId });
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
