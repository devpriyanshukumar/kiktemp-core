/**
 * forbidden.js
 *
 * A custom response. Gives a 403 - Forbidden error
 * when user does not have permission for the request.
 */

module.exports = function forbidden(optionalData) {

  // Get access to `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 403;

  const errorMessage = 'We are Sorry, you are not allowed to proceed.';

  const error = 'Forbidden';

  sails.log.error(errorMessage);

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    return res.status(statusCodeToSet).send({
      error: error,
      message: errorMessage,
      statusCode: statusCodeToSet,
    });
  }

  else if (optionalData) {
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
      statusCode: statusCodeToSet,
    });
  }
  // Set status code and send response data.
  else {
    return res.status(statusCodeToSet).send({
      error: error,
      message: errorMessage,
      statusCode: statusCodeToSet
    });
  }

};
