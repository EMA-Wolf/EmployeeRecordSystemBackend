const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  joinDate: { type: Date, default: Date.now },
  attendance: [
    {
      date: { type: String, required: true }, // The date the employee logged in
      value: { type: Number, enum: [1], default: 1 }, // The value is always 1
    },
  ],
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
