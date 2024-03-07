module.exports = {


  friendlyName: 'Create cubicle',


  description: '',


  inputs: {
    projectId: {
      type: 'number',
      required: true
    },

    coolingSystemId: {
      type: 'number',
      required: true
    },

    horizontalSeparation: {
      type: 'number',
      required: true
    },

    positionId: {
      type: 'number',
      required: true
    },

    louverArea: {
      type: 'number',
      required: true
    },

    height: {
      type: 'number',
      required: true
    },

    width: {
      type: 'number',
      required: true
    },

    depth: {
      type: 'number',
      required: true
    },

    targetTemperature: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Cubicle saved successfully',
    },
  },


  fn: async function (inputs, exits) {

    try {

      let newCubicle = await Cubicle.create({
        projectId: inputs.projectId,
        coolingSystemId: inputs.coolingSystemId,
        horizontalSeperation: inputs.horizontalSeparation,
        positionId: inputs.positionId,
        louverArea: inputs.louverArea,
        height: inputs.height,
        width: inputs.width,
        depth: inputs.depth,
        targetTemperature: inputs.targetTemperature
      }).fetch();

      var cubicleDataVM = {
        id: newCubicle.id,
        projectId: newCubicle.projectId,
        coolingSystemId: newCubicle.coolingSystemId,
        horizontalSeperation: newCubicle.horizontalSeparation,
        positionId: newCubicle.positionId,
        louverArea: newCubicle.louverArea,
        height: newCubicle.height,
        width: newCubicle.width,
        depth: newCubicle.depth,
        targetTemperature: newCubicle.targetTemperature,
        powerLoss: newCubicle.powerLoss
      }

      return exits.success({
        isSuccess: true,
        message: 'success',
        messageDetails : 'Cubicle added successfully',
        cubicleDataVM: cubicleDataVM,
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
