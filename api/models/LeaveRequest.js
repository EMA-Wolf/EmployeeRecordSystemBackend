const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  employeeName: { type:String, required: true },
  leaveType: { type: String, enum: ['Sick Leave', 'Casual Leave', 'Maternity Leave'], required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  reason: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);
