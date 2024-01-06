const employeeService = require("../Services/employeeService");
const Employee = require("../Models/Employee");
const contractService = require("../Services/contractService");
const userService = require("../Services/userService");
const employeeController = {
  addEmployee: async (req, res) => {
    try {
      employeeService
        .createNewEmployee(req.body.employee)
        .then((employee) => {
          userService.createNewUser({
            employeeId: employee._id,
            email: employee.email,
            password: "123456",
          });
          contractService
            .createNewContract(employee._id, req.body.contract)
            .then((contract) => res.status(200).json({ employee, contract }));
        })
        .catch((error) => res.status(400).json(error));
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
  getEmployee: async (req, res) => {
    try {
      const employee = await Employee.findBtyId(req.params.id);
      res.status(200).json(employee);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getEmployeeList: async (req, res) => {
    try {
      const data = await employeeService.getListEmployee();
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
module.exports = employeeController;
