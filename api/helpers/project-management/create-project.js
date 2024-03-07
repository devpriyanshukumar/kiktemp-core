module.exports = {

  friendlyName: 'Create project',
  description: '',

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
      description: 'All done.',
    },
  },

  fn: async function (inputs) {

    var newlyCreatedProject = await sails.getDatastore().transaction(async (db) => {

      let newProject = await Project.create({
        projectName: inputs.projectName,
        installationTypeId: inputs.typeOfInstallation,
        elevation: inputs.elevation,
        demandFactor: inputs.demandFactor,
        ambientTem: inputs.ambientTemperature,
        userId: inputs.userId
      })
        .fetch()
        .usingConnection(db);

      var projectNoPrefix = await RefDataMaster.findOne({ category: 'PROJECT_N0_PREFIX' });

      let updatedProject = await Project.update({ id: newProject.id }).set({
        projectNo: projectNoPrefix.value + newProject.id.toString().padStart(4, '0')
      })
        .fetch()
        .usingConnection(db);

      return updatedProject;

    });

    return newlyCreatedProject;
  }
};