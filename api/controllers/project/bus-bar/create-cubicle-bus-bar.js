module.exports = {


  friendlyName: 'Create cubicle bus bar',


  description: '',


  inputs: {
    cubicleId: {
      type: 'number',
      required: true
    },

    description: {
      type: 'string',
      required: true
    },

    busBarType: {
      type: 'string',
      required: true
    },

    heightAndThickness: {
      type: 'string',
      required: true
    },

    inputCurrent: {
      type: 'string',
      required: true
    },

    busBarlength: {
      type: 'number',
      required: true
    },

    conductorTemperature: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Bus bar saved successfully',
    },
  },


  fn: async function (inputs, exits) {

    try {

      var cubicleData = await Cubicle.findOne({ id: inputs.cubicleId });

      if (!cubicleData) {
        return exits.success({
          isSuccess: true,
          message: "warn",
          messageDetails : "Cubicle related to bus bar not found"
        });
      }

      var powerLossData = await sails.helpers.projectManagement.calculateBusbarPowerLoss(
        inputs.busBarType,
        inputs.heightAndThickness,
        inputs.inputCurrent,
        inputs.busBarlength,
        cubicleData.targetTemperature,
        inputs.conductorTemperature
      );

      let newBusBar = await BusBar.create({
        cubicleId: inputs.cubicleId,
        description: inputs.description,
        busBarType: inputs.busBarType,
        heightAndThickness: inputs.heightAndThickness,
        inputCurrent: inputs.inputCurrent,
        busBarlength: inputs.busBarlength,
        powerLoss: powerLossData.actualPowerLoss,
        maxCurrent: powerLossData.maxCurrent,
        maxPowerLoss: powerLossData.maxPowerLoss,
        conductorTemperature: inputs.conductorTemperature
      }).fetch();

      var busBarDataVM = {
        id: newBusBar.id,
        description: newBusBar.description,
        arrangement: newBusBar.busBarType,
        crossSection: newBusBar.heightAndThickness,
        inputCurrent: newBusBar.inputCurrent,
        length: newBusBar.length,
        maxCurrent: newBusBar.maxCurrent,
        maxPowerLoss: newBusBar.maxPowerLoss,
        powerLoss: newBusBar.powerLoss,
        conductorTemperature: newBusBar.conductorTemperature
      }

      await sails.helpers.projectManagement.updateCubiclePowerLoss(cubicleData.projectId, inputs.cubicleId);

      var createBusbarResponseDataVM = {
        busBarDataVM: busBarDataVM
      }


      return exits.success({
        message: 'success',
        messageDetails: 'Bus bar added successfully',
        isSuccess: true,
        createBusbarResponseDataVM: createBusbarResponseDataVM,
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
