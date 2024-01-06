const DepartmentService = require("../Services/departmentService");
const Department = require("../Models/Department");
const DepartmentController = {
  addDepartment: async (req, res) => {
    try {
      console.log(req.body);
      const newDepartment = await DepartmentService.createNewDepartment(
        req.body
      );
      return res.status(200).json(newDepartment);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  updateDepartment: async (req, res) => {
    try {
      const updateDepartment = await DepartmentService.updateDepartment(
        req.body.id,
        req.body.event
      );
      res.status(200).json(updateDepartment);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getDepartments: async (req, res) => {
    try {
      const departments = await DepartmentService.getListDepartment();
      res.status(200).json(departments);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteDepartment: async (req, res) => {
    try {
      await Department.findByIdAndDelete(req.params.id);
      res.status(200).json("Department successfully deleted");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
module.exports = DepartmentController;
