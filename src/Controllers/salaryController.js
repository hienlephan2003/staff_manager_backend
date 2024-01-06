const salaryService = require("../Services/salaryService");
const salaryController = {
  createSalary: async (req, res) => {
    const data = await salaryService.getSalaryData(
      "658ef5c07d69f0ab55353973",
      1,
      2024
    );
    res.status(200).json(data);
  },
};
module.exports = salaryController;
