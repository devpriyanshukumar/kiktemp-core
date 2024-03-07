/**
 * invalidOrExpiredToken.js
 *
 * A custom response. Gives a 400 - Bad Request error
 * when the confirmation token is empty or expired
 *
 */

module.exports = function invalidOrExpiredToken(optionalData) {

  // Get access to `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 400;

  const emptyTokenErrorMessage = 'The provided token is empty.';
  const emptyTokenError = 'Empty Token';

  const invalidTokenErrorMessage = 'Your verification link is expired.';
  const invalidTokenError = 'Invalid Token';

  // Token from the email is provided as the optional data
  // If no data is provided or token is undefined,
  // use res.send().
  if (optionalData === undefined) {
    sails.log.error(emptyTokenErrorMessage);
    return res.status(statusCodeToSet).send({
      error: emptyTokenError,
      message: emptyTokenErrorMessage,
      statusCode: statusCodeToSet
    });
  }

  // Else if the provided token is invalid or expired,
  else if (optionalData) {
    sails.log.error(invalidTokenErrorMessage);
    return res.status(statusCodeToSet).send({
      error: invalidTokenError,
      message: invalidTokenErrorMessage,
      statusCode: statusCodeToSet
    });
  }

  // Set status code and send response data.
  else {
    return res.status(statusCodeToSet).send({
      error: invalidTokenError,
      message: invalidTokenErrorMessage,
      statusCode: statusCodeToSet
    });
  }

};
