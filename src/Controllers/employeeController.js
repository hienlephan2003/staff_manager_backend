const employeeService = require("../Services/employeeService");
const Employee = require("../Models/Employee");
const employeeController = {
  addEmployee: async (req, res) => {
    try {
      const newEmployee = await employeeService.createNewEmployee(req.body);
      return res.status(200).json(newEmployee);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateEmployee: async (req, res) => {
    try {
      const updateEmployee = await employeeService.updateEmployee(
        req.body.id,
        req.body.event
      );
      res.status(200).json(updateEmployee);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteEmployee: async (req, res) => {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.status(200).json("Employee successfully deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = employeeController;
