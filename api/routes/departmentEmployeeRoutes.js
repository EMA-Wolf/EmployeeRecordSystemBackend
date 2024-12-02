const express = require("express");
const {
  getAllDepartments,
  getAllEmployees,
} = require("../controllers/departmentEmployeeControllers");

const router = express.Router();

router.get("/departmentData", getAllDepartments);
router.get("/employeeData", getAllEmployees);

module.exports = router;
