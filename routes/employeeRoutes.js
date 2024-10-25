const express = require('express');
const { createEmployee, getAllEmployees, editEmployee, deleteEmployee } = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/create_employee', authMiddleware(['HR']), createEmployee);


router.get('/get_employee', authMiddleware(['HR']), getAllEmployees);


router.put('/:employeeId', authMiddleware(['HR']), editEmployee);

router.delete('/:employeeId', authMiddleware(['HR']), deleteEmployee);

module.exports = router;
