/**
 * invalidInput.js
 *
 * A custom response. Gives a 400 - Bad Request error
 * when the input parameter is invalid.
 *
 */

module.exports = function invalidInput(optionalData) {

  // Get access to and `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 400;

  const errorMessage = 'Input parameter(s) is(are) invalid or empty.';

  const error = 'Invalid Parameter';

  sails.log.error(errorMessage);

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    return res.status(statusCodeToSet).send({
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
      error: error,
      message: errorMessage,
      statusCode: statusCodeToSet
    });
  }
  // Set status code and send response data.
  else {
    return res.status(statusCodeToSet).send({
      error: error,
      message: errorMessage,
      statusCode: statusCodeToSet,
      data: optionalData
    });
  }

};
