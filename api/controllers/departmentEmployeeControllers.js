const Employee = require('../models/Employee');

// Fetch all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          totalNumber: { $sum: 1 },
          vacancies: { $sum: { $cond: [{ $eq: ["$position", "Vacant"] }, 1, 0] } }
        }
      }
    ]);

    res.status(200).json({ success: true, data: departments });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ success: false, message: 'Error fetching departments', error: error.message });
  }
};

// Fetch all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ success: false, message: 'Error fetching employees', error: error.message });
  }
};

module.exports = { getAllDepartments, getAllEmployees }; 