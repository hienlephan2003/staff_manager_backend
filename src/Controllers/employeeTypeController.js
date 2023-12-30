const employeeTypeService = require("../Services/employeeTypeService");
const EmployeeType = require("../Models/EmployeeType");
const employeeTypeController = {
  addEmployeeType: async (req, res) => {
    try {
      const newEmployeeType = await employeeTypeService.createNewEmployeeType(
        req.body
      );
      return res.status(200).json(newEmployeeType);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateEmployeeType: async (req, res) => {
    try {
      const updateEmployeeType = await employeeTypeService.updateEmployeeType(
        req.body.id,
        req.body
      );
      res.status(200).json(updateEmployeeType);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteEmployeeType: async (req, res) => {
    try {
      await EmployeeType.findByIdAndDelete(req.params.id);
      res.status(200).json("EmployeeType successfully deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getEmployeeTypes: async (req, res) => {
    try {
      const employeeTypes = await EmployeeType.find();
      res.status(200).json(employeeTypes);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = employeeTypeController;
