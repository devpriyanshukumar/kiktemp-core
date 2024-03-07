/**
 * operationalError.js
 *
 * A custom response. Gives a 400 - Bad Request error
 * when a run time error is encountered.
 */

module.exports = function methodNotAllowed() {

  // Get access to `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 405;

  const errorMessage = 'The requested method is not supported by the target resource.';

  const error = 'The request was formed improperly';

  sails.log.error(errorMessage);

  return res.status(statusCodeToSet).send({
    error: error,
    message: errorMessage,
    statusCode: statusCodeToSet
  });


};
