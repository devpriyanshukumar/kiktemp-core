/**
 * incorrectPassword.js
 *
 * A custom response. Gives a 401 - Unauthorized error
 * when the entered password and password in the database are not the same
 */

module.exports = function passwordMismatch() {

  // Get access to `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 401;

  const errorMessage = 'It looks like you entered an incorrect password. Please double-check and try again.';

  const error = 'Incorrect password.';

  sails.log.error(errorMessage);

  return res.status(statusCodeToSet).send({
    error: error,
    message: errorMessage,
    statusCode: statusCodeToSet
  });


};
