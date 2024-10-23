const Task = require('../models/task');
const User = require('../models/User');

exports.createTask = async (req, res) => {
    const { title, description, problems } = req.body;
    const employeeId = req.user.employeeId; 

    try {
        const user = await User.findOne({ employeeId });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const task = new Task({
            employeeId,
            title,
            description,
            problems,
            firstName: user.firstName,
              
        });

        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        console.error('Create Task Error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getTasksForEmployee = async (req, res) => {
    const employeeId = req.user.employeeId;
    try {
        const tasks = await Task.find({ employeeId });
        res.json(tasks);
    } catch (err) {
        console.error('Get Tasks Error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

