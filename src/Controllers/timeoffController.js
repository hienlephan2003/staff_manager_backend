const { default: mongoose } = require("mongoose");
const Employee = require("../Models/Employee");
const EmployeeTimeOff = require("../Models/EmployeeTimeOff");
const TimeOff = require("../Models/TimeOff");
const TimeOffType = require("../Models/TimeOffType");
const timeOffService = require("../Services/timeOffService");
const { getDateDistance } = require("../Utils/dateUtil");
const timeoffController = {
  addTimeOffRequest: async (req, res) => {
    try {
      const data = {
        employeeId: req.body.user.employeeId._id,
        timeOffTypeId: req.body.timeOffTypeId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      };
      const today = new Date();
      if (data.startDate <= today && data.endDate <= data.startDate)
        res.status(400).json("date not valid");
      else {
        const emptimeoff = await EmployeeTimeOff.findOne({
          employeeId: data.employeeId,
          timeOffTypeId: data.timeOffTypeId,
        });
        console.log(emptimeoff);
        const distance = getDateDistance(data.startDate, data.endDate);
        console.log(distance);
        if (emptimeoff.remain >= distance) {
          const timeoff = await TimeOff.create({
            ...data,
            numOfDate: distance,
          });
          res.status(200).json(timeoff);
        } else {
          res.status(400).json("Dont have enough date");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  updateTimeOff: async (req, res) => {
    try {
      const { timeOffId, status } = req.body;
      const timeOff = await TimeOff.findByIdAndUpdate(
        timeOffId,
        {
          status,
        },
        { new: true }
      );
      console.log(timeOff);
      if (timeOff.status == "approved") {
        const emptimeoff = await EmployeeTimeOff.findOne({
          employeeId: timeOff.employeeId,
          timeOffTypeId: timeOff.timeOffTypeId,
        });
        emptimeoff.remain -= timeOff.numOfDate;
        emptimeoff.save();
        console.log(emptimeoff);
      }
      res.status(200).json(timeOff);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  updateTimeOffType: async (req, res) => {
    try {
      const timeOffTypeName = req.body.timeOffTypeName;
      const timeOffType = await TimeOffType.findOneAndUpdate(
        { timeOffTypeName },
        req.body
      );
      res.status(200).json(timeOffType);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  createTimeOffType: async (req, res) => {
    try {
      const timeOffTypeName = req.body.timeOffTypeName;
      const timeOffType = await TimeOffType.updateOne(
        { timeOffTypeName },
        req.body,
        { upsert: true }
      );
      res.status(200).json(timeOffType);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  applyTimeOffForAllEmployee: async (req, res) => {
    try {
      const timeOffTypeId = req.body.timeOffTypeId;
      const employees = await Employee.find({});
      const result = await timeOffService.applyTimeOff(
        employees,
        timeOffTypeId
      );
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  applyTimeOff: async (req, res) => {
    try {
      const employees = req.body.employees;
      const timeOffTypeId = req.body.timeOffTypeId;
      const result = await timeOffService.applyTimeOff(
        employees,
        timeOffTypeId
      );
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getTimeOffTypes: async (req, res) => {
    try {
      const timeoffs = await TimeOffType.find({});
      return res.status(200).json(timeoffs);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = timeoffController;
