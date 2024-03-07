module.exports = {

    friendlyName: 'Notify Admin of New Access Request',
    description: 'Sends an email notification to the admin regarding a new access request.',
  
    inputs: {
  
      contactNumber: {
        type: 'string',
        required: true
      },
  
      country: {
        type: 'string',
        required: true
      },
  
      name: {
        type: 'string',
        required: true
      },
  
      organizationName: {
        type: 'string',
        required: true
      },
  
      userId: {
        type: 'number',
        required: true
      },
  
      website: {
        type: 'string',
        required: false
      }
    },
  
    exits: {
      success: {
        description: 'User updated successfully.',
      },
    },
  
    fn: async function (inputs, exits) {
  
      try {
          user = await User.findOne({
            id: inputs.userId
          });
  
          if (user) {
              let updatedUser = await sails.helpers.userRegistration.updateProfile(
                inputs.name,
                inputs.country,
                inputs.contactNumber,
                inputs.organizationName,
                inputs.website,
                inputs.userId
              );

              if(updatedUser) {
                return exits.success({
                    signupRequestDataVM: updatedUser,
                    isSuccess: true,
                    message: "Successfully Updated"
                  });
              }
            } else {
              return this.res.userAlreadyRegistered();
            }
  
      } catch (error) {
        sails.log.error(error);
  
        if (error.code === sails.config.custom.uniqueError) {
          return this.res.userAlreadyExits(error);
        }
  
        if (error.code === sails.config.custom.invalidParamsError) {
          return this.res.badRequest(error);
        }
  
        return this.res.serverError(error);
  
      }
  
    }
  
  
  };
  