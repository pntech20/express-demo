module.exports.sendSuccess = (message, statusCode = 200) => {
  return {
    statusCode,
    message,
  };
};

module.exports.sendError = (error, statusCode = 400) => {
  return {
    statusCode,
    error,
  };
};
