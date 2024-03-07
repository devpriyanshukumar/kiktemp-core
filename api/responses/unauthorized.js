/**
 * unauthorized.js
 *
 * A custom response. Gives a 401 - Unauthorized error
 * when user is not logged in.
 */

module.exports = function unauthorized() {

  // Get access to `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 401;

  const errorMessage = 'You are not authorized to access this page.';

  const error = 'Unauthorized access';

  sails.log.error(errorMessage);

  return res.status(statusCodeToSet).send({
    error: error,
    message: errorMessage,
    statusCode: statusCodeToSet
  });

};
