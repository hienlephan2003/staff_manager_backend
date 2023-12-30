const { default: mongoose } = require("mongoose");
const Contract = require("../Models/Contract");
const ContractType = require("../Models/ContractType");
const contractService = {
  createNewContract: (employeeId, contract) => {
    return new Promise(async (resolve, reject) => {
      try {
        const moneyItems = Object.keys(contract.moneyItems).map((item) => {
          return {
            type: item,
            value: contract.moneyItems[item],
          };
        });
        console.log(moneyItems);
        contract.moneyItems = moneyItems;
        const newContract = await Contract.create({
          ...contract,
          employeeId,
        });
        resolve(newContract);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  },
  createNewContractType: (contractTypeName, description) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newContractType = new ContractType({
          contractTypeName,
          description,
        });
        const saveContractType = await newContractType.save();
        resolve(saveContractType);
      } catch (e) {
        reject(e);
      }
    });
  },
  updateContract: (contractId, contract) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateContract = await Contract.findByIdAndUpdate(
          contractId,
          {
            $set: contract,
          },
          { new: true }
        );
        resolve(updateContract);
      } catch (e) {
        reject(e);
      }
    });
  },
  getListContract: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allContract = await Contract.find({})
          .limit(10)
          .sort({ startAt: 1 })
          .exec();
        resolve(allContract);
      } catch (e) {
        reject(e);
      }
    });
  },
};

module.exports = contractService;
