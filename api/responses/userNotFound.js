/**
 * userNotFound.js
 *
 * A custom response. Gives a 404 - Not Found error
 * when the user is not found in the system
 */

module.exports = function userNotFound() {

  // Get access to `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 404;

  const errorMessage = 'This user is not existing in the system.';

  const error = 'User Not Found';

  sails.log.error(errorMessage);

  return res.status(statusCodeToSet).send({
    error: error,
    message: errorMessage,
    statusCode: statusCodeToSet
  });

};
