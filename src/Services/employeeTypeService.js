const EmployeeType = require("../Models/EmployeeType");
const employeeTypeService = {
  createNewEmployeeType: (employeeType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newEmployeeType = new EmployeeType(employeeType);
        const saveEmployeeType = await newEmployeeType.save();
        resolve(saveEmployeeType);
      } catch (e) {
        reject(e);
      }
    });
  },
  updateEmployeeType: (employeeTypeId, employeeType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateEmployeeType = await EmployeeType.findByIdAndUpdate(
          employeeTypeId,
          {
            $set: employeeType,
          },
          { new: true }
        );
        resolve(updateEmployeeType);
      } catch (e) {
        reject(e);
      }
    });
  },
  getListEmployeeType: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allEmployeeType = await EmployeeType.find({}).exec();
        resolve(allEmployeeType);
      } catch (e) {
        reject(e);
      }
    });
  },
};

module.exports = employeeTypeService;
