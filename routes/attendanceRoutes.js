const express = require('express');
const { checkIn, checkOut } = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/checkin', authMiddleware(['Employee']), checkIn);
router.post('/checkout', authMiddleware(['Employee']), checkOut);

module.exports = router;