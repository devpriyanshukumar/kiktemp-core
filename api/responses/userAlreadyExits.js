/**
 * userAlreadyExits.js
 *
 * A custom response. Gives a 400 - Bad Request error
 * when the user tries to create an account with
 * an existing email address.
 *
 */

module.exports = function userAlreadyExits(optionalData) {

  // Get access to `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 400;

  const errorCode = 'E_UNIQUE';

  const error = 'Email address already in use';

  const errorMessage = 'This user already exists. Try Sign In. If you cannot remember the password try resetting the password.';

  sails.log.error(errorMessage);

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    return res.status(statusCodeToSet).send({
      errorCode: errorCode,
      error: error,
      message: errorMessage,
      statusCode: statusCodeToSet
    });
  }
  // Else if the provided data is an Error instance, if it has
  // a toJSON() function, then always run it and use it as the
  // response body to send.  Otherwise, send down its `.stack`,
  // except in production use res.sendStatus().
  else if (_.isError(optionalData)) {
    return res.status(statusCodeToSet).send({
      errorCode: optionalData.code,
      error: error,
      message: errorMessage,
      statusCode: statusCodeToSet
    });
  }

  // Set status code and send response data.
  else {
    return res.status(statusCodeToSet).send({
      errorCode: optionalData.code,
      error: error,
      message: errorMessage,
      statusCode: statusCodeToSet
    });
  }

};
