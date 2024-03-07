module.exports = {


  friendlyName: 'Create cubicle power cable',


  description: '',


  inputs: {
    projectId: {
      type: 'number',
      required: true
    },

    cubicleId: {
      type: 'number',
      required: true
    },

    description: {
      type: 'string',
      required: true
    },

    maximumCurrent: {
      type: 'number',
      required: true
    },

    conductorTemperature: {
      type: 'number',
      required: true
    },

    currentCarryingCapacityId: {
      type: 'number',
      required: true
    },

    insulationCorrectionFactorId: {
      type: 'number',
      required: true
    },

    inputCurrent: {
      type: 'number',
      required: true
    },

    cableLength: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'PowerCable saved successfully',
    },
  },


  fn: async function (inputs, exits) {

    try {
      var cubicleData = await Cubicle.findOne({ id: inputs.cubicleId });

      if (!cubicleData) {
        return exits.success({
          isSuccess: true,
          message: "warn",
          messageDetails: "Cubicle related to bus bar not found"
        });
      }

      var currentCarryingCapacity = await RefDataCableCurrentCarryingCapacity.findOne({ id: inputs.currentCarryingCapacityId });

      var powerLossData = await sails.helpers.projectManagement.calculateCablePowerLoss(
        inputs.maximumCurrent,
        inputs.conductorTemperature,
        currentCarryingCapacity.crossSectionalArea,
        inputs.inputCurrent,
        inputs.cableLength
      );

      let newCable = await PowerCable.create({
        cubicleId: inputs.cubicleId,
        description: inputs.description,
        conductorTemperature: inputs.conductorTemperature,
        maximumCurrent: inputs.maximumCurrent,
        currentCarryingCapacityId: inputs.currentCarryingCapacityId,
        insulationCorrectionFactorId: inputs.insulationCorrectionFactorId,
        inputCurrent: inputs.inputCurrent,
        cableLength: inputs.cableLength,
        maximumPowerLoss: powerLossData.maxPowerLoss,
        powerLoss: powerLossData.actualPowerLoss
      }).fetch();

      var cableDataVM = {
        id: newCable.id,
        cubicleId: newCable.cubicleId,
        description: newCable.description,
        conductorTemperature: newCable.conductorTemperature,
        maximumCurrent: newCable.maximumCurrent,
        currentCarryingCapacityId: newCable.currentCarryingCapacityId,
        insulationCorrectionFactorId: newCable.insulationCorrectionFactorId,
        inputCurrent: newCable.inputCurrent,
        cableLength: newCable.cableLength,
        maximumPowerLoss: newCable.maximumPowerLoss,
        powerLoss: newCable.powerLoss
      }
      
      await sails.helpers.projectManagement.updateCubiclePowerLoss(inputs.projectId, inputs.cubicleId);

      var createCableResponseDataVM = {
        topic: 'Cable added successfully',
        cableDataVM: cableDataVM
      }

      return exits.success({
        message: 'success',
        messageDetails: 'Power cable added successfully',
        isSuccess: true,
        createCableResponseDataVM: createCableResponseDataVM,
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
