const leaveRequest = require('../models/LeaveRequest');

const newLeaveRequest = async (req,res) =>{
    const { employeeName, leaveType, startDate, endDate, reason } = req.body;

    if(!employeeName || !leaveType || !startDate || !endDate || !reason){
        console.log("All fields are required")
        return res.status(400).json({message: 'All fields are required'});
    }

    try {
        // Create new leave request
        const request = await leaveRequest.create({
            employeeName,
            leaveType,
            startDate,
            endDate,
            reason,
            status: 'Pending' // Default status for new requests
        });
        console.log("Leave request created successfully")

        res.status(201).json({
            success: true,
            message: 'Leave request created successfully',
        });

    } catch (error) {
        console.error('Error creating leave request:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating leave request',
            error: error.message
        });
    }
}

const getAllLeaveRequests = async (req, res) => {
    try {
        const requests = await leaveRequest.find();
        res.status(200).json({
            success: true,
            data: requests
        });
    } catch (error) {
        console.error('Error fetching leave requests:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching leave requests',
            error: error.message
        });
    }
}

const updateLeaveRequestStatus = async (req, res) => {
  const { requestId, status } = req.body;

  try {
    await leaveRequest.findByIdAndUpdate(requestId, { status });
    res.status(200).json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating leave request status:', error);
    res.status(500).json({ success: false, message: 'Error updating status', error: error.message });
  }
};

module.exports = {newLeaveRequest ,getAllLeaveRequests, updateLeaveRequestStatus}

