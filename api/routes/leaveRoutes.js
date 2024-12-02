const express = require('express');
const {newLeaveRequest, getAllLeaveRequests, updateLeaveRequestStatus} = require('../controllers/leaveRequestControllers')

const router = express.Router();

router.post("/newLeaveRequest",newLeaveRequest)
router.get("/allLeaveRequests",getAllLeaveRequests)
router.put("/updateStatus", updateLeaveRequestStatus);

module.exports = router;