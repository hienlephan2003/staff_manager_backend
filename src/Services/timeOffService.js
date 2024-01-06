const EmployeeTimeOff = require("../Models/EmployeeTimeOff");
const TimeOffType = require("../Models/TimeOffType");

const timeOffService = {
  applyTimeOff: async (employees, timeOffTypeId) => {
    return new Promise(async (res, rej) => {
      try {
        const timeOffType = await TimeOffType.findById(timeOffTypeId);
        const data = employees.map((item) => {
          return {
            employeeId: item._id,
            timeOffTypeId: timeOffType._id,
            remain: timeOffType.numOfDate,
          };
        });
        console.log(data);
        const result = await EmployeeTimeOff.insertMany(data);
        res(result);
      } catch (err) {
        console.log(err);
        rej(err);
      }
    });
  },
};
module.exports = timeOffService;
