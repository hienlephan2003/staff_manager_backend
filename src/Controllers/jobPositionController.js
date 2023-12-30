const jobPositonService = require("../Services/jobPositionService");
const JobPosition = require("../Models/JobPosition");
const JobPositionType = require("../Models/JobPositionType");
const jobPositonController = {
  addJobPosition: async (req, res) => {
    try {
      const newJobPosition = await jobPositonService.createNewJobPosition(
        req.body
      );
      return res.status(200).json(newJobPosition);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateJobPosition: async (req, res) => {
    try {
      const updateJobPosition = await jobPositonService.updateJobPosition(
        req.body.id,
        req.body
      );
      res.status(200).json(updateJobPosition);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteJobPosition: async (req, res) => {
    try {
      await JobPosition.findByIdAndDelete(req.params.id);
      res.status(200).json("JobPosition successfully deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getJobPositions: async (req, res) => {
    try {
      const jobPositons = await JobPosition.find();
      res.status(200).json(jobPositons);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getJobPositionsGroupByType: async (req, res) => {
    JobPosition.aggregate([
      {
        $lookup: {
          from: "jobpositiontypes",
          localField: "positionType",
          foreignField: "_id",
          as: "jobPositionType",
        },
      },
      {
        $unwind: "$jobPositionType",
      },
      {
        $group: {
          _id: "$jobPositionType",
          jobPositions: { $push: "$$ROOT" },
        },
      },
    ])
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  },
};
module.exports = jobPositonController;
