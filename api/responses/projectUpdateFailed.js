/**
 * projectCreationFailed.js
 *
 * A custom response. Gives a 401 - Unauthorized error
 * when the entered password and password in the database are not the same
 */

module.exports = function projectUpdateFailed() {

    // Get access to `res`
    var res = this.res;
  
    // Define the status code to send in the response.
    var statusCodeToSet = 404;
  
    const errorMessage = "Couldn't Find the project, Please check project Id and UserId and try again.";
  
    const error = 'Something went wrong.';
  
    sails.log.error(errorMessage);
  
    return res.status(statusCodeToSet).send({
      error: error,
      message: errorMessage,
      statusCode: statusCodeToSet
    });
  
  
  };
  