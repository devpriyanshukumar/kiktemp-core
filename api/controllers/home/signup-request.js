module.exports = {

  friendlyName: 'Notify Admin of New Access Request',
  description: 'Sends an email notification to the admin regarding a new access request.',

  inputs: {
    email: {
      type: 'string',
      required: true
    },

    name: {
      type: 'string',
      required: true
    },

    country: {
      type: 'string',
      required: true
    },

    phoneNumber: {
      type: 'string',
      required: true
    },

    organizationName: {
      type: 'string',
      required: true
    },

    website: {
      type: 'string'
    }
  },

  exits: {
    success: {
      description: 'Email notification sent successfully.',
    },
  },

  fn: async function (inputs, exits) {

    try {

      var user = await User.findOne({
        email: inputs.email
      });

      if (user) {
        if (user.status === 'requested') {
          await User.destroy({
            email: user.email
          });
        } else {
          return this.res.userAlreadyExits();
        }
      }

      // Create a new user with the provided details
      let newUser = await sails.helpers.userRegistration.createUser(
        inputs.email.toLowerCase(),
        inputs.name,
        inputs.country,
        inputs.phoneNumber,
        inputs.organizationName,
        inputs.website
      );

      // Construct the signup URL with query parameters
      const baseUrl = sails.config.custom.siteUrl + '/home/login';
      const queryParams = new URLSearchParams({
        redirectTo: 'signUp',
        childUserId: newUser.id
      });

      const loginUrl = `${baseUrl}?${queryParams.toString()}`;

      // Create the email data
      const emailData = {
        organizationName: inputs.organizationName,
        contactPersonName: inputs.name,
        emailAddress: inputs.email,
        contactNumber: inputs.phoneNumber,
        country: inputs.country,
        website: inputs.website,
        loginUrl: loginUrl,
      };

      // Arrange the email options
      const emailOptions = await sails.helpers.emailService.arrangeEmailOptions(
        sails.config.custom.adminMail,
        'KIKTEMP NOTIFICATION - SIGNUP REQUEST',
        'signupRequest',
        emailData
      );

      let response = await sails.helpers.emailService.sendMail(emailOptions);
      sails.log(response);

      var signupRequestResponseDataVM = {
        topic: 'Access Request Submitted',
        messageTopic: 'Congratulations on taking the first step !',
        message: 'Your access request has been successfully submitted. Our team will carefully review your request and get back to you soon.'
      };

      return exits.success({
        signupRequestResponseDataVM: signupRequestResponseDataVM,
        isSuccess: true
      });

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