const express = require('express');
const { createTask, getTasksForEmployee } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/', authMiddleware(['Employee']), createTask);


router.get('/', authMiddleware(['Employee']), getTasksForEmployee);

module.exports = router;
