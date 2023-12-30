const MoneyItem = require("../Models/MoneyItem");
const moneyItemService = {
  createNewMoneyItem: (moneyItem) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newMoneyItem = new MoneyItem(moneyItem);
        const saveMoneyItem = await newMoneyItem.save();
        resolve(saveMoneyItem);
      } catch (e) {
        reject(e);
      }
    });
  },
  //   updateMoneyItem: (moneyItemId, moneyItem) => {
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         const updateMoneyItem = await MoneyItem.findByIdAndUpdate(
  //           moneyItemId,
  //           {
  //             $set: moneyItem,
  //           },
  //           { new: true }
  //         );
  //         resolve(updateMoneyItem);
  //       } catch (e) {
  //         reject(e);
  //       }
  //     });
  //   },
  getListMoneyItem: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allMoneyItem = await MoneyItem.find({}).exec();
        resolve(allMoneyItem);
      } catch (e) {
        reject(e);
      }
    });
  },
};

module.exports = moneyItemService;
