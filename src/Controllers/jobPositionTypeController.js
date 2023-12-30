const jobPositionTypeService = require("../Services/jobPositionTypeService");
const JobPositionType = require("../Models/JobPositionType");
const jobPositionTypeController = {
  addJobPositionType: async (req, res) => {
    try {
      const newJobPositionType =
        await jobPositionTypeService.createNewJobPositionType(req.body);
      return res.status(200).json(newJobPositionType);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateJobPositionType: async (req, res) => {
    try {
      const updateJobPositionType =
        await jobPositionTypeService.updateJobPositionType(
          req.body.id,
          req.body
        );
      res.status(200).json(updateJobPositionType);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteJobPositionType: async (req, res) => {
    try {
      await JobPositionType.findByIdAndDelete(req.params.id);
      res.status(200).json("JobPositionType successfully deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllJobPositionTypes: async (req, res) => {
    try {
      const jobPositionTypes = await JobPositionType.find();
      res.status(200).json(jobPositionTypes);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = jobPositionTypeController;
