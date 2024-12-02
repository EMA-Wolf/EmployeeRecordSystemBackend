const express = require('express');
const { getEmployeeReport } = require('../controllers/reportControllers');

const router = express.Router();

// Define the route for fetching an employee report
router.get('/employee/:employeeId/report', getEmployeeReport);

module.exports = router;