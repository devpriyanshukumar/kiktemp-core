module.exports = {

  friendlyName: 'Remove Project from KIKTEMP',
  description: 'Remove Project from KIKTEMP',

  inputs: {
    loggedInUserId: {
      type: 'number',
      required: true
    },

    selectedProjectId: {
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
      description: '',
    },
  },

  fn: async function (inputs, exits) {

    try {

      const loggedInUser = await User.findOne({ id: inputs.loggedInUserId });

      if (!loggedInUser) {
        return this.res.notAUser(inputs.loggedInUserId);
      }

      // Check the passowrds are matched or not
      await sails.helpers.passwords.checkPassword(inputs.password, loggedInUser.password);

      // Remove the selected project
      await Project.destroyOne({ id: inputs.selectedProjectId });

      var removeProjectResponseDataVM = {
        topic: "Project Removed",
        message: "The project has been removed successfully."
      };

      return exits.success({
        removeProjectResponseDataVM: removeProjectResponseDataVM,
        isSuccess: true
      });

    } catch (err) {
      sails.log.error(err);

      if (err.code === sails.config.custom.incorrect) {
        return this.res.incorrectPassword();
      }

      if (err.isOperational) {
        return this.res.operationalError();
      }

      return this.res.serverError(err.message);
    }

  }
};