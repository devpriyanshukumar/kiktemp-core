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

    typeOfInstallation: {
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
    }
  },

  exits: {
    success: {
      description: 'Project created successfully.',
    },
  },

  fn: async function (inputs, exits) {

    try {

      createdProject = await sails.helpers.projectManagement.createProject(
        inputs.userId,
        inputs.projectName,
        inputs.typeOfInstallation,
        inputs.demandFactor,
        inputs.elevation,
        inputs.ambientTemperature
      );

      if (createdProject && createdProject.length) {
        let projectIdDataVM = {
          projectId: createdProject[0].id
        }

        return exits.success({
          projectIdDataVM: projectIdDataVM,
          message: 'success',
          messageDetails: 'Succesfully Created ',
          isSuccess: true
        });
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
