const Degree = require("../Models/Degree");
const degreeService = {
  createNewDegree: (degree) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newDegree = new Degree(degree);
        const saveDegree = await newDegree.save();
        resolve(saveDegree);
      } catch (e) {
        reject(e);
      }
    });
  },
  updateDegree: (degreeId, degree) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateDegree = await Degree.findByIdAndUpdate(
          degreeId,
          {
            $set: degree,
          },
          { new: true }
        );
        resolve(updateDegree);
      } catch (e) {
        reject(e);
      }
    });
  },
  getListDegree: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allDegree = await Degree.find({}).exec();
        resolve(allDegree);
      } catch (e) {
        reject(e);
      }
    });
  },
};

module.exports = degreeService;
