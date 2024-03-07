/**
 * projectCreationFailed.js
 *
 * A custom response. Gives a 401 - Unauthorized error
 * when the entered password and password in the database are not the same
 */

module.exports = function projectCreationFailed() {

    // Get access to `res`
    var res = this.res;
  
    // Define the status code to send in the response.
    var statusCodeToSet = 401;
  
    const errorMessage = "Couldn't able to create project, Please try again";
  
    const error = 'Something went wrong.';
  
    sails.log.error(errorMessage);
  
    return res.status(statusCodeToSet).send({
      error: error,
      message: errorMessage,
      statusCode: statusCodeToSet
    });
  
  
  };
  