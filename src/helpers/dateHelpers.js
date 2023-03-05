const getCurrentDate = () => prepareDate(new Date());

const prepareDate = jsDate => {
  jsDate.setHours(0);
  jsDate.setMinutes(0);
  jsDate.setSeconds(0);
  jsDate.setMilliseconds(0);

  return jsDate;
};

const formatDate = jsDate => {
  var aDate = jsDate.toLocaleDateString().split('.');
  return `${aDate[2]}-${aDate[1]}-${aDate[0]}`;
};

export { getCurrentDate, prepareDate, formatDate };