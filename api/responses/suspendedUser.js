/**
 * suspendedUser.js
 *
 * A custom response. Gives a 403 - Forbidden error
 * when a suspended user tries to login.
 */

module.exports = function suspendedUser() {

  // Get access to `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 403;

  const errorMessage = 'Your account is suspended. Please check your emails for further information.';

  const error = 'Account suspended';

  sails.log.info(errorMessage);
  sails.log.error(error);

  return res.status(statusCodeToSet).send({
    error: error,
    message: errorMessage,
    statusCode: statusCodeToSet
  });

};
