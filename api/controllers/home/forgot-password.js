module.exports = {


  friendlyName: 'Forgot password',


  description: '',


  inputs: {
    email: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Email sent successfully'
    }
  },


  fn: async function (inputs, exits) {

    try {
      
      const token = await sails.helpers.strings.random('url-friendly');

      const user = await User.findOne({ email: inputs.email });

      if (!user) {
        return this.res.notAUser(inputs.email);
      }

      await User.update({ id: user.id }).set({
        resetPasswordEmailProofToken: token,
        resetPasswordEmailProofTokenExpiration: Date.now() + sails.config.custom.emailProofTokenTTL
      }).fetch();

      Link = `${sails.config.custom.siteUrl}/home/reset-password?token=${token}`;

      const emailData = {
        name: user.name,
        redirectLink: Link,
      }

      const emailOptions = await sails.helpers.emailService.arrangeEmailOptions(
        inputs.email,
        'KIKTEMP NOTIFICATION - RESET PASSWORD',
        'forgotPassword',
        emailData
      );

      let response = await sails.helpers.emailService.sendMail(emailOptions);
      sails.log(response);

      var forgotPasswordResponseDataVM = {
        topic: 'Password reset email sent.',
        message: `We've just sent you an email containing a password reset link to ${user.email}. If you don't see it in your inbox within a few minutes, please check your spam folder.`
      };

      return exits.success({
        forgotPasswordResponseDataVM: forgotPasswordResponseDataVM,
        isSuccess: true
      });

    } catch (err) {
      sails.log.error(err);

      if (err.code === sails.config.custom.invalidParamsError) {
        return this.res.badRequest(err);
      }

      return this.res.serverError(err);
    }

  }


};
