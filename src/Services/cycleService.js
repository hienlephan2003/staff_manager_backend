const Cycle = require("../Models/Cycle");
const cycleService = {
  createNewCycle: (cycle) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newCycle = new Cycle(cycle);
        const saveCycle = await newCycle.save();
        resolve(saveCycle);
      } catch (e) {
        reject(e);
      }
    });
  },
  updateCycle: (cycleId, cycle) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateCycle = await Cycle.findByIdAndUpdate(
          cycleId,
          {
            $set: cycle,
          },
          { new: true }
        );
        resolve(updateCycle);
      } catch (e) {
        reject(e);
      }
    });
  },
  getListCycle: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allCycle = await Cycle.find({}).exec();
        resolve(allCycle);
      } catch (e) {
        reject(e);
      }
    });
  },
};

module.exports = cycleService;
