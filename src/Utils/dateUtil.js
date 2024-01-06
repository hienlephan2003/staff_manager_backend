const dateUtil = {
  getDateDistance: (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const timeDifference = end - start;
    console.log(timeDifference);
    const numberOfDays = Math.round(timeDifference / (1000 * 60 * 60 * 24));
    return numberOfDays;
  },
};

module.exports = dateUtil;
