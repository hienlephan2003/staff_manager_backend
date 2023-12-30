const Department = require("../Models/Department");
const departmentService = {
  createNewDepartment: (department) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newDepartment = new Department(department);
        const saveDepartment = await newDepartment.save();
        resolve(saveDepartment);
      } catch (e) {
        reject(e);
      }
    });
  },
  updateDepartment: (departmentId, department) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateDepartment = await Department.findByIdAndUpdate(
          departmentId,
          {
            $set: department,
          },
          { new: true }
        );
        resolve(updateDepartment);
      } catch (e) {
        reject(e);
      }
    });
  },
  getListDepartment: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allDepartment = await Department.find({}).exec();
        resolve(allDepartment);
      } catch (e) {
        reject(e);
      }
    });
  },
  //   deleteDepartmentById: () =>{
  //     return new Promise(async (resolve, reject)=>{
  //         try{
  //             const emmployee = await
  //         }
  //     })
  //   }
};

module.exports = departmentService;
