module.exports = {


  friendlyName: 'Reset password',


  description: '',


  inputs: {
    token: {
      type: 'string',
      required: true
    },

    newPassword: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Token validated and changed the password'
    }
  },


  fn: async function (inputs, exits) {

    try {
      if (!inputs.token) {
        return this.res.invalidOrExpiredToken();
      }

      var user = await User.findOne({ resetPasswordEmailProofToken: inputs.token });

      if (!user || user.resetPasswordEmailProofTokenExpiration <= Date.now()) {
        return this.res.invalidOrExpiredToken(inputs.token);
      } else {
        const updatedUser = await User.updateOne({ id: user.id }).set({
          resetPasswordEmailProofToken: '',
          resetPasswordEmailProofTokenExpiration: 0,
          password: inputs.newPassword
        });

        var resetPasswordResponseDataVM = {
          topic: `Password changed successfully`,
          message: `Your password has been changed successfully. You can now log in with your new password.`,
        };

        return exits.success({
          resetPasswordResponseDataVM: resetPasswordResponseDataVM,
          isSuccess: true
        });
      }

    } catch (error) {
      sails.log.error(error);

      return this.res.serverError(error.message);
    }

  }


};
