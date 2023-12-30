const JobPosition = require("../Models/JobPosition");
const jobPositionService = {
  createNewJobPosition: (jobPosition) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(jobPosition);
        const newJobPosition = new JobPosition(jobPosition);
        const saveJobPosition = await newJobPosition.save();
        resolve(saveJobPosition);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  },
  updateJobPosition: (jobPositionId, jobPosition) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateJobPosition = await JobPosition.findByIdAndUpdate(
          jobPositionId,
          {
            $set: jobPosition,
          },
          { new: true }
        );
        resolve(updateJobPosition);
      } catch (e) {
        reject(e);
      }
    });
  },
  getListJobPosition: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allJobPosition = await JobPosition.find({}).exec();
        resolve(allJobPosition);
      } catch (e) {
        reject(e);
      }
    });
  },
};

module.exports = jobPositionService;
