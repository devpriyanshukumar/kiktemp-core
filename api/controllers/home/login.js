module.exports = {


  friendlyName: 'Login',


  description: 'Login home.',


  inputs: {
    email: {
      type: 'string',
      required: true,
    },

    password: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Login successful.'
    }
  },


  fn: async function (inputs, exits) {

    try {

      const user = await User.findOne({ email: inputs.email });

      if (!user) {
        return this.res.notAUser(inputs.email);

      } else if (user.status === sails.config.custom.suspended) {
        return this.res.suspendedUser();

      } else if (user.status === sails.config.custom.removed) {
        return this.res.removedUser();

      } else if (user.status === sails.config.custom.requested) {
        return this.res.requestedUser();
      }

      await sails.helpers.passwords.checkPassword(inputs.password, user.password);

      const token = await sails.helpers.service.generateNewJwtToken(user.id, user.userType);

      var loginResponseDataVM = {
        message: `${user.email} successfully logged in`,
        bearer: token,
        id: user.id,
        userRole: user.userType,
        userName: user.name
      };

      return exits.success({
        loginResponseDataVM: loginResponseDataVM,
        isSuccess: true
      });

    } catch (err) {
      sails.log.error(err);

      if (err.code === sails.config.custom.incorrect) {
        return this.res.passwordMismatch();
      }

      if (err.isOperational) {
        return this.res.operationalError();
      }

      return this.res.serverError(err.message);
    }

  }


};
