module.exports = {

    friendlyName: 'Notify Admin of New Access Request',
    description: 'Sends an email notification to the admin regarding a new access request.',
  
    inputs: {
      userId: {
        type: 'number',
        required: true
      },
  
      password: {
        type: 'string',
        required: true
      }
    },
  
    exits: {
      success: {
        description: 'Password updated successfully.',
      },
    },
  
    fn: async function (inputs, exits) {
  
      try {

        var user = await User.findOne({
          id: inputs.userId
        });
  
        if (user) {
          let updatedUser = await sails.helpers.userRegistration.updatePassword(
            inputs.userId,
            inputs.password,
          );

          if(updatedUser) {
            var signupRequestResponseDataVM = {
                topic: '',
                message: 'Succesfully updated password'
            };
        
            return exits.success({
                signupRequestResponseDataVM: signupRequestResponseDataVM,
                isSuccess: true
            });
          }
          else {
            var signupRequestResponseDataVM = {
                topic: '',
                message: 'Could not update password'
            };
        
            return exits.success({
                signupRequestResponseDataVM: signupRequestResponseDataVM,
                isSuccess: false
            });
          }
        }
        else {
          return this.res.userNotFound();
        }

      } catch (error) {
        sails.log.error(error);
  
        if (error.code === sails.config.custom.uniqueError) {
          return this.res.userAlreadyExits(error);
        }
  
        if (error.code === sails.config.custom.invalidParamsError) {
          return this.res.badRequest(error);
        }
  
        return this.res.serverError(err);
      }
    }
  };