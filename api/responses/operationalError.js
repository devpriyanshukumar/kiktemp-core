/**
 * operationalError.js
 *
 * A custom response. Gives a 400 - Bad Request error
 * when a run time error is encountered.
 */

module.exports = function operationalError() {

  // Get access to `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 400;

  const errorMessage = 'Error logging in user with given email.';

  const error = 'The request was formed improperly';

  sails.log.error(errorMessage);

  return res.status(statusCodeToSet).send({
    error: error,
    message: errorMessage,
    statusCode: statusCodeToSet
  });


};
