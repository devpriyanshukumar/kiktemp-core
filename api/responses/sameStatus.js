/**
 * sameStatus.js
 *
 * A custom response. Gives a 400 - Bad Request error
 * when a run time error is encountered.
 */

module.exports = function sameStatus(status) {

  // Get access to `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 400;

  const errorMessage = `User already ${status}`;

  const error = `Unable to ${status}`;

  sails.log.error(errorMessage);

  return res.status(statusCodeToSet).send({
    error: error,
    message: errorMessage,
    statusCode: statusCodeToSet
  });


};
