/**
 * notAHuman.js
 *
 * A custom response. Gives a 403 - Forbidden error
 * when the reCaptcha fails
 */

module.exports = function notAHuman(optionalData) {

  // Get access to `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 403;

  const errorMessage = 'You are not a human.';

  sails.log.error(errorMessage);

  return res.status(statusCodeToSet).send({
    error: optionalData['error-codes'],
    message: errorMessage,
    statusCode: statusCodeToSet
  });
};
