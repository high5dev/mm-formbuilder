
const moment = require("moment");

exports.calculatePassedDays = (date) => {
  let days = moment().diff(date, "days");
  return days;
};

function dateRange (startDate, endDate, weekDays) {
  const dateArray = [];
  let currentDate = moment(startDate);
  while (currentDate.isSameOrBefore(moment(endDate))) {
    if (weekDays.includes(currentDate.format('dddd'))) {
      dateArray.push(currentDate.format('yyyy-MM-DD'));
    }

    currentDate = moment(currentDate).add(1, 'day');
  }
  return dateArray;
};
module.exports = dateRange;


