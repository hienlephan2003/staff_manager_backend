const JobPosition = require("../Models/JobPosition");
const JobPositionType = require("../Models/JobPositionType");
const jobPositionTypeService = {
  createNewJobPositionType: (jobPositionType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const job = await JobPositionType.findOne(jobPositionType);
        console.log(job);
        if (job == null) {
          const newJobPositionType = new JobPositionType(jobPositionType);
          console.log(newJobPositionType);
          const saveJobPositionType = await newJobPositionType.save();
          resolve(saveJobPositionType);
        } else reject(e);
      } catch (e) {
        reject(e);
      }
    });
  },
  updateJobPositionType: (jobPositionTypeId, jobPositionType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateJobPositionType = await JobPositionType.findByIdAndUpdate(
          jobPositionTypeId,
          {
            $set: jobPositionType,
          },
          { new: true }
        );
        resolve(updateJobPositionType);
      } catch (e) {
        reject(e);
      }
    });
  },
  getListJobPositionType: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allJobPositionType = await JobPositionType.find({}).exec();
        resolve(allJobPositionType);
      } catch (e) {
        reject(e);
      }
    });
  },
};

module.exports = jobPositionTypeService;
