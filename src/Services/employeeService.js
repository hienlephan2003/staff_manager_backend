const Employee = require("../Models/Employee");
const employeeService = {
  createNewEmployee: (employee) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newAddress = new Address(employee.address);
        employee.addressId = newAddress._id;
        const newEmployee = new Employee(employee);
        newAddress.save();
        const saveEmployee = await newEmployee.save();
        resolve(saveEmployee);
      } catch (e) {
        reject(e);
      }
    });
  },
  updateEmployee: (employeeId, employee) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateEmployee = await Employee.findByIdAndUpdate(
          employeeId,
          {
            $set: employee,
          },
          { new: true }
        );
        resolve(updateEmployee);
      } catch (e) {
        reject(e);
      }
    });
  },
  getListEmployee: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allEmployee = await Employee.find({})
          .limit(10)
          .sort({ startAt: 1 })
          .exec();
        resolve(allEmployee);
      } catch (e) {
        reject(e);
      }
    });
  },
};

module.exports = employeeService;
