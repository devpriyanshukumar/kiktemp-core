/**
 * removedUser.js
 *
 * A custom response. Gives a 403 - Forbidden error
 * when a removed user tries to login.
 */

module.exports = function removedUser() {

  // Get access to `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 403;

  const errorMessage = 'Your account is removed. Please check your emails for further information.';

  const error = 'Account removed';

  sails.log.info(errorMessage);
  sails.log.error(error);

  return res.status(statusCodeToSet).send({
    error: error,
    message: errorMessage,
    statusCode: statusCodeToSet
  });

};
