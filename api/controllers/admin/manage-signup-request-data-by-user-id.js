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
    email: {
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
      defaultsTo: 0
    },

    userType: {
      type: 'string',
      required: true
    },

    website: {
      type: 'string',
      required: false
    },

    parentId: {
      type: 'number'
    }
  },

  exits: {
    success: {
      description: 'Email notification sent successfully.',
    },
  },

  fn: async function (inputs, exits) {

    try {

      var user;
      var updatedUser;

      if (inputs.userId !== 0) {

        user = await User.findOne({
          id: inputs.userId,
          email: inputs.email
        });

        if (user) {

          if (user.status === 'requested') {
            updatedUser = await sails.helpers.userRegistration.updateUser(
              inputs.email.toLowerCase(),
              inputs.name,
              inputs.country,
              inputs.contactNumber,
              inputs.organizationName,
              inputs.website,
              inputs.userType,
              inputs.userId,
              inputs.parentId,
              sails.config.custom.verified
            );
          } else {
            return this.res.userAlreadyRegistered();
          }
        } else {
          return this.res.userNotFound();
        }

      } else {

        user = await User.findOne({
          email: inputs.email
        });

        if (user) {
          return this.res.userAlreadyInTheSystem();

        } else {
          // Create a new user with the provided details
          updatedUser = await sails.helpers.userRegistration.createUser(
            inputs.email.toLowerCase(),
            inputs.name,
            inputs.country,
            inputs.contactNumber,
            inputs.organizationName,
            inputs.website,
            inputs.userType,
            inputs.parentId,
            'verified'
          );
        }

      }

      if (updatedUser) {
        // Construct the signup URL with query parameters
        const loginUrl = sails.config.custom.siteUrl + '/home/login';

        // Create the email data
        const emailData = {
          contactPersonName: updatedUser.name,
          emailAddress: updatedUser.email,
          password: updatedUser.password,
          loginUrl: loginUrl,
        };

        // Arrange the email options
        const emailOptions = await sails.helpers.emailService.arrangeEmailOptions(
          updatedUser.email,
          'KIKTEMP NOTIFICATION - LOGIN CREDENTIALS',
          'signupConfirm',
          emailData
        );

        let response = await sails.helpers.emailService.sendMail(emailOptions);

        var signupUserResponseDataVM = {
          topic: updatedUser.name + " " + "Successfully Verified!",
          messageTopic: '',
          message: response.message
        };

        return exits.success({
          signupRequestResponseDataVM: signupUserResponseDataVM,
          isSuccess: true
        });
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
