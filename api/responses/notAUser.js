/**
 * notAUser.js
 *
 * A custom response. Gives a 404 - Not Found error
 * when the email couldn't be found in the user table.
 */

module.exports = function notAUser(userEmail) {

  // Get access to `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 404;

  const errorMessage = `${userEmail} does not have a user account. Please go through request access process.`;

  const error = 'User not found';
  sails.log.error(errorMessage);

  return res.status(statusCodeToSet).send({
    error: error,
    message: errorMessage,
    statusCode: statusCodeToSet
  });

};
