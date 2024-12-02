const Employee = require("../models/Employee");

const getEmployeeReport = async (req, res) => {
  const { employeeId } = req.params;
  try {
    // Fetch the employee data from the database
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Generate the report data (this is a placeholder, adjust as needed)
    const reportData = {
      name: `${employee.firstName} ${employee.lastName}`,
      position: employee.position,
      department: employee.department,
      attendance: employee.attendance, // Assuming attendance is a field in the employee model
      // Add more fields as necessary
    };

    res.status(200).json(reportData);
  } catch (error) {
    console.error("Error fetching employee report:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getEmployeeReport };
