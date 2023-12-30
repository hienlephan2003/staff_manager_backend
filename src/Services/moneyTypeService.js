const MoneyType = require("../Models/MoneyType");
const moneyTypeService = {
  createNewMoneyType: (moneyType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newMoneyType = new MoneyType(moneyType);
        const saveMoneyType = await newMoneyType.save();
        resolve(saveMoneyType);
      } catch (e) {
        reject(e);
      }
    });
  },
  updateMoneyType: (moneyTypeId, moneyType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateMoneyType = await MoneyType.findByIdAndUpdate(
          moneyTypeId,
          {
            $set: moneyType,
          },
          { new: true }
        );
        resolve(updateMoneyType);
      } catch (e) {
        reject(e);
      }
    });
  },
  getListMoneyType: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allMoneyType = await MoneyType.find({}).exec();
        resolve(allMoneyType);
      } catch (e) {
        reject(e);
      }
    });
  },
};

module.exports = moneyTypeService;
