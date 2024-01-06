const EmployeeTimesheet = require("../Models/EmployeeTimesheet");
const Shift = require("../Models/Shift");
const mongoose = require("mongoose");
const Parser = require("expr-eval").Parser;

const salaryService = {
  getSalaryData: async (timesheetId, month, year) => {
    return new Promise(async (res, rej) => {
      try {
        const shifts = await Shift.aggregate([
          {
            $match: {
              timesheetId: new mongoose.Types.ObjectId(timesheetId),
            },
          },
        ]);
        const data = await EmployeeTimesheet.aggregate([
          {
            $match: {
              timesheetId: new mongoose.Types.ObjectId(timesheetId),
            },
          },
          {
            $lookup: {
              from: "contracts",
              localField: "employeeId",
              foreignField: "employeeId",
              as: "contractDetail",
            },
          },
          {
            $addFields: {
              contractDetail: { $arrayElemAt: ["$contractDetail", 0] },
            },
          },
          {
            $unwind: "$contractDetail.moneyItems",
          },
          {
            $lookup: {
              from: "moneytypes", // Assuming 'moneytypes' is the collection name for MoneyType
              localField: "contractDetail.moneyItems.type",
              foreignField: "_id",
              as: "contractDetail.moneyItems.type", // Populate the 'type' field
            },
          },
          {
            $group: {
              _id: {
                employeeId: "$employeeId",
                timesheetId: "$timesheetId",
              },
              moneyItems: {
                $push: {
                  name: {
                    $first: "$contractDetail.moneyItems.type.moneyTypeName",
                  },
                  type: {
                    $first: "$contractDetail.moneyItems.type.type",
                  },
                  value: "$contractDetail.moneyItems.value",
                },
              },
              jobPosition: { $first: "$contractDetail.jobPosition" },
              salary: { $first: "$contractDetail.salary" },
              overtimeRate: { $first: "$contractDetail.overtimeRate" },
              lateMinusPertime: { $first: "$contractDetail.lateMinusPertime" },
            },
          },
          {
            $project: {
              _id: 0,
              employeeId: "$_id.employeeId",
              timesheetId: "$_id.timesheetId",
              moneyItems: 1,
              jobPosition: 1,
              salary: 1,
              overtimeRate: 1,
              lateMinusPertime: 1,
            },
          },
          {
            $lookup: {
              from: "points",
              localField: "employeeId", // Match employeeId from EmployeeTimesheet with Point model
              foreignField: "employeeId",
              as: "employeePoints",
            },
          },
          {
            $unwind: "$employeePoints",
          },
          {
            $group: {
              _id: "$employeeId", // Group by employeeId
              // root: { $mergeObjects: "$$ROOT" },
              jobPosition: { $first: "$$ROOT.jobPosition" },
              moneyItems: { $first: "$$ROOT.moneyItems" },
              salary: { $first: "$$ROOT.salary" },
              overtimeRate: { $first: "$$ROOT.overtimeRate" },
              lateMinusPertime: { $first: "$$ROOT.lateMinusPertime" },
              totalPoint: { $sum: "$employeePoints.point" },
              totalLateMinutes: { $sum: "$employeePoints.lateMinutes" }, // Calculate total late minutes
              totalSoonMinutes: { $sum: "$employeePoints.soonMinutes" }, // Calculate total soon minutes
              // ... Other groupings or calculated fields
            },
          },
          {
            $lookup: {
              from: "jobpositions", // Assuming 'jobpositions' is the collection name for JobPosition
              localField: "jobPosition",
              foreignField: "_id",
              as: "jobDetail",
            },
          },
          {
            $addFields: {
              positionName: { $arrayElemAt: ["$jobDetail.positionName", 0] },
              positionAllowance: { $arrayElemAt: ["$jobDetail.allowance", 0] },
            },
          },
          {
            $project: {
              jobDetail: 0,
            },
          },
          {
            $addFields: {
              totalMoneyItems: {
                $sum: {
                  $sum: {
                    $map: {
                      input: "$moneyItems",
                      as: "item",
                      in: {
                        $cond: {
                          if: { $eq: ["$$item.type", "fixed"] },
                          then: "$$item.value",
                          else: {
                            $multiply: [
                              "$salary",
                              { $divide: [{ $toDouble: "$$item.value" }, 100] },
                            ],
                          },
                        },
                      },
                    },
                  },
                },
              },
              // Calculate total deduction for late minutes and soon minutes
              totalDeduction: {
                $subtract: [
                  {
                    $sum: ["$totalLateMinutes", "$totalSoonMinutes"],
                  },
                  {
                    $multiply: ["$lateMinusPertime", "$totalLateMinutes"],
                  },
                ],
              },
            },
          },
          // {
          //   $addFields: {
          //     finalSalary: {
          //       $subtract: [
          //         {
          //           $add: ["$salary", "$totalMoneyItems", "$positionAllowance"],
          //         },
          //         "$totalDeduction",
          //       ],
          //     },
          //   },
          // },
          // {
          //   $project: {
          //     _id: 1,
          //     jobPosition: 1,
          //     moneyItems: 1,
          //     salary: 1,
          //     overtimeRate: 1,
          //     lateMinusPertime: 1,
          //     totalPoint: 1,
          //     totalLateMinutes: 1,
          //     totalSoonMinutes: 1,
          //     positionName: 1,
          //     positionAllowance: 1,
          //     finalSalary: 1,
          //     // Exclude other intermediate fields if not needed
          //   },
          // },
        ]);
        const standardPoint = 28;
        const parser = new Parser();
        const newdata = data.map((item) => {
          const totalPoint = item.totalPoint;
          const salary = item.salary;

          let actualSalaryExpr = parser.parse(
            "totalPoint/standardPoint*salary"
          );
          let actualSalary = actualSalaryExpr.evaluate({
            totalPoint,
            standardPoint,
            salary,
          });
          console.log(actualSalary);
          return {
            ...data,
            actualSalary,
          };
        });
        // const totalPoint = data.totalPoint;
        // const standardPoint = 4;
        // const salary = data.salary;
        // const exp = "totalPoint/standardPoint*salary";
        // const parser = new Parser();
        // let expr = parser.parse("2 * x + 1");
        // let dfg = expr.evaluate({ x: 3 }); // 7
        // console.log(dfg);
        res(newdata);
      } catch (err) {
        console.log(err);
        rej(err);
      }
    });
  },
};
module.exports = salaryService;
