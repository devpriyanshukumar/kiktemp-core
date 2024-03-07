module.exports = {

  friendlyName: 'Create project',
  description: '',

  inputs: {

    projectName: {
      type: 'string',
      required: true
    },

    installationTypeId: {
      type: 'string',
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
      description: 'All done.',
    },
  },

  fn: async function (inputs) {

    let updatedProject = await Project.update({ id: inputs.projectId }).set({
      projectName: inputs.projectName,
      installationTypeId: inputs.installationTypeId,
      elevation: inputs.elevation,
      demandFactor: inputs.demandFactor,
      ambientTem: inputs.ambientTemperature
    }).fetch();

    return updatedProject;
  }
};