/**
 * badRequest.js
 *
 * A custom response. 400 Error - Bad Request Error
 *
 *
 */

module.exports = function badRequest(optionalData) {

  // Get access to and `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 400;

  const errorMessage = 'Input parameters are invalid or empty.';

  const error = 'Bad Request';

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
      errorCode: optionalData.code,
      error: error,
      message: optionalData ? optionalData : errorMessage,
      statusCode: statusCodeToSet
    });
  }

};
