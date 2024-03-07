/**
 * dataNotFound.js
 *
 * A custom response. Gives a 404 - Not Found error
 * when the requested page is not found.
 *
 */

module.exports = function dataNotFound(optionalData) {

  // Get access to `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 404;

  const errorMessage = 'The requested data is not found.';

  const error = 'Not found';

  sails.log.error(errorMessage);

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    return res.status(statusCodeToSet).send({
      error: error,
      message: errorMessage,
      statusCode: statusCodeToSet
    });
  }

  else if (optionalData) {
    return res.status(statusCodeToSet).send({
      error: error,
      message: optionalData,
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
      message: optionalData,
      statusCode: statusCodeToSet
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
