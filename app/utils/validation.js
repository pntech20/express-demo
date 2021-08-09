module.exports.validationName = function (value) {
  const regex = /^[A-Za-z]\w{6,}$/;
  return regex.test(value);
};
