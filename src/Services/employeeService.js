const Employee = require("../Models/Employee");
const Address = require("../Models/Address");
const { uploadNewFile } = require("../Services/imageService");
const employeeService = {
  createNewEmployee: (employee) => {
    return new Promise(async (resolve, reject) => {
      try {
        const address = {
          province: employee.province.name,
          district: employee.district.name,
          ward: employee.ward.name,
          provinceCode: employee.province.code,
          districtCode: employee.district.code,
          wardCode: employee.ward.code,
        };
        const newAddress = new Address(address);
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
        const allEmployee = await Employee.aggregate([
          {
            $lookup: {
              from: "contracts",
              let: { empId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$employeeId", "$$empId"] },
                        // { $eq: ["$status", "working"] },
                      ],
                    },
                  },
                },
                { $sort: { startDate: -1 } }, // Sort to get the earliest contract first
                { $limit: 1 }, // Get only the first (earliest) contract
              ],
              as: "contractData",
            },
          },
          {
            $addFields: {
              contract: { $arrayElemAt: ["$contractData", 0] }, // Get the first contract
            },
          },
          {
            $addFields: {
              dependencePersons: { $sum: "$dependencePersons" },
            },
          },
          {
            $project: {
              contractData: 0,
              // email: 1,
              // fullName: 1,
              // phoneNumber: 1,
              // firstContract: '$firstContract', // Add the entire contract object to firstContract
            },
          },
          // {
          //   $unwind: {
          //     path: "$contract.moneyItems",
          //     includeArrayIndex: "moneyItemIndex",
          //     // preserveNullAndEmptyArrays: true, // Set to true if 'moneyItems' can be empty
          //   },
          // },
          {
            $lookup: {
              from: "moneytypes", // Assuming 'moneytypes' is the collection name for MoneyType
              localField: "contract.moneyItems.type",
              foreignField: "_id",
              as: "contract.moneyItems.type", // Populate the 'type' field
            },
          },
          {
            $lookup: {
              from: "jobpositions",
              localField: "contract.jobPosition",
              foreignField: "_id",
              as: "jobPosition",
            },
          },
          {
            $addFields: {
              jobPosition: {
                $cond: {
                  if: { $gt: [{ $size: "$jobPosition" }, 0] },
                  then: { $arrayElemAt: ["$jobPosition", 0] },
                  else: null, // Or omit this line to not add the field when jobPosition is empty
                },
              },
            },
          },
          {
            $lookup: {
              from: "contracttypes",
              localField: "contract.type",
              foreignField: "_id",
              as: "contractType",
            },
          },
          {
            $lookup: {
              from: "departments",
              localField: "departmentId",
              foreignField: "_id",
              as: "department",
            },
          },
          {
            $lookup: {
              from: "addresses",
              localField: "addressId",
              foreignField: "_id",
              as: "addressId",
            },
          },
          {
            $addFields: {
              addressId: {
                $cond: {
                  if: { $gt: [{ $size: "$addressId" }, 0] },
                  then: { $arrayElemAt: ["$addressId", 0] },
                  else: null,
                },
              },
              contractType: {
                $cond: {
                  if: { $gt: [{ $size: "$contractType" }, 0] },
                  then: { $arrayElemAt: ["$contractType", 0] },
                  else: null,
                },
              },
              // department: { $arrayElemAt: ["department", 0] },
              department: {
                $cond: {
                  if: { $gt: [{ $size: "$department" }, 0] },
                  then: { $arrayElemAt: ["$department", 0] },
                  else: null,
                },
              },
              contractExpireDate: "$contract.expireDate",
              salary: "$contract.salary",
              overtimeRate: "$contract.overtimeRate",
              lateMinusPerMinutes: "$contract.lateMinusPerMinutes",
              positionName: "$jobPosition.positionName",
              salaryRange: "$jobPosition.salaryRange",
            },
          },
          {
            $addFields: {
              contractTypeName: "$contractType.contractTypeName",
              departmentName: "$department.departmentName",
              // address: {
              //   $concat: [
              //     "$addressId.ward" +
              //       "$addressId.district" +
              //       "$addressId.province",
              //   ],
              // },
            },
          },
          {
            $project: {
              email: 1,
              imageUrl: 1,
              dependencePersons: 1,
              contractExpireDate: 1,
              salary: 1,
              salaryRange: 1,
              overtimeRate: 1,
              lateMinusPerMinutes: 1,
              positionName: 1,
              contractTypeName: 1,
              workingStartDate: 1,
              departmentName: 1,
              status: 1,
              fullName: 1,
              address: {
                $concat: ["$addressId.district", ", ", "$addressId.province"],
              },
            },
          },
          // {
          //   $addFields: {
          //     jobPosition: { $arrayElemAt: ["$jobPosition", 0] },
          //   },
          // },
        ]);

        resolve(allEmployee);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  },
};

module.exports = employeeService;
