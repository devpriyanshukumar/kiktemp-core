/**
 * requestedUser.js
 *
 * A custom response. Gives a 403 - Forbidden error
 * when a requested user tries to login.
 */

module.exports = function requestedUser() {

  // Get access to `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 403;

  const errorMessage = 'Your account is not verified yet. Please contact admin.';

  const error = 'Account not verified.';

  sails.log.info(errorMessage);
  sails.log.error(error);

  return res.status(statusCodeToSet).send({
    error: error,
    message: errorMessage,
    statusCode: statusCodeToSet
  });

};
