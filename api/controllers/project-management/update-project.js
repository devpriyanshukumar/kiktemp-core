module.exports = {

  friendlyName: 'Notify Admin of New Access Request',
  description: 'Insert newly created project details',

  inputs: {

    userId: {
      type: 'number',
      required: true
    },

    projectName: {
      type: 'string',
      required: true
    },

    installationTypeId: {
      type: 'number',
      required: true
    },

    demandFactor: {
      type: 'number',
      required: true
    },

    elevation: {
      type: 'number',
      required: true
    },

    ambientTemperature: {
      type: 'number',
      required: true
    },

    projectId: {
      type: 'number',
      required: true
    }
  },

  exits: {
    success: {
      description: 'Project updated successfully.',
    },
  },

  fn: async function (inputs, exits) {

    try {

      var project = await Project.findOne({
        id: inputs.projectId,
        userId: inputs.userId
      });

      if (project) {
        updatedProject = await sails.helpers.projectManagement.updateProject(
          inputs.projectName,
          inputs.installationTypeId,
          inputs.demandFactor,
          inputs.elevation,
          inputs.ambientTemperature,
          inputs.projectId
        );

        if (updatedProject) {
          let projectDataVM = {
            projectDataVM: updatedProject
          }

          return exits.success({
            projectDataVM: projectDataVM,
            message: 'Successfully updated',
            isSuccess: true
          });
        }
      }
      else {
        return this.res.projectUpdateFailed();
      }

    } catch (error) {
      sails.log.error(error);

      if (error.code === sails.config.custom.invalidParamsError) {
        return this.res.badRequest(error);
      }

      return this.res.serverError(error);

    }

  }
};
