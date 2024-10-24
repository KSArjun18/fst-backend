const express = require('express');
const { createTask, getTasksForEmployee } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/create_task', authMiddleware(['Employee']), createTask);


router.get('/get_tasks', authMiddleware(['Employee']), getTasksForEmployee);

module.exports = router;
