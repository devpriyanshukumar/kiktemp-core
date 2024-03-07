/**
 * unableToSuspend.js
 *
 * A custom response. Gives a 400 - Bad Request error
 * when a run time error is encountered.
 */

module.exports = function unableToSuspend(selectedUserName, status) {

  // Get access to `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 400;
  var actionStatus = status === sails.config.custom.verified ? 'unsuspend' : 
                     status === sails.config.custom.suspended ? 'suspend' :
                     status === sails.config.custom.removed ? 'remove' : '';

  const errorMessage = `Unable to ${actionStatus} ${selectedUserName} due to active customers in their organization.`;

  const error = `Unable to ${status}`;

  sails.log.error(errorMessage);

  return res.status(statusCodeToSet).send({
    error: error,
    message: errorMessage,
    statusCode: statusCodeToSet
  });


};
