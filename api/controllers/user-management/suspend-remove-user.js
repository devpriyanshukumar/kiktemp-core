module.exports = {

  friendlyName: 'Suspend, Unsuspend, Remove User from KIKTEMP',
  description: 'Suspend, Unsuspend, Remove User from KIKTEMP',

  inputs: {
    loggedInUserId: {
      type: 'number',
      required: true
    },

    actionType: {
      type: 'string',
      required: true
    },

    selectedUserId: {
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

      var actionStatus = inputs.actionType === sails.config.custom.verified ? sails.config.custom.unsuspended : inputs.actionType;
      const loggedInUser = await User.findOne({ id: inputs.loggedInUserId });

      if (!loggedInUser) {
        return this.res.notAUser(inputs.loggedInUserId);
      }

      // Check the passowrds are matched or not
      await sails.helpers.passwords.checkPassword(inputs.password, loggedInUser.password);

      if (loggedInUser.userType !== sails.config.custom.admin && loggedInUser.userType !== sails.config.custom.distributor) {
        return this.res.methodNotAllowed();
      }

      const selectedUser = await User.findOne({ id: inputs.selectedUserId });

      if (!selectedUser) {
        return this.res.notAUser(inputs.selectedUserId);
      }

      if (selectedUser.status === inputs.actionType) {
        return this.res.sameStatus(actionStatus);
      }

      const childUsers = await User.find({ parentId: inputs.selectedUserId });

      if (childUsers.length > 0) {
        return this.res.unableToSuspend(selectedUser.name, actionStatus);

      } else {
        //Updated the status of the selected user
        await User.updateOne({ id: inputs.selectedUserId }).set({ status: inputs.actionType });

        var suspendRemoveUserResponseDataVM = {
          topic: `User ${actionStatus}`,
          message: `User - ${selectedUser.name} ${actionStatus} successfully.`
        };

      }

      return exits.success({
        suspendRemoveUserResponseDataVM: suspendRemoveUserResponseDataVM,
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