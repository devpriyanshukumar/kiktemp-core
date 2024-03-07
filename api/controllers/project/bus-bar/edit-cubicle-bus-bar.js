module.exports = {


  friendlyName: 'Edit cubicle bus bar',


  description: '',


  inputs: {
    busBarId: {
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
      type: 'string',
      required: true
    },

    conductorTemperature: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Bus bar edited successfully',
    }
  },


  fn: async function (inputs, exits) {

    try {
      var bbquery = `
          SELECT busbar.id "BUS_BAR_ID", busbar."DESCRIPTION", busbar."BUS_BAR_TYPE", busbar."HEIGHT_AND_THICKNESS", busbar."INPUT_CURRENT", busbar."BUS_BAR_LENGTH", 
          busbar."POWER_LOSS", busbar."MAX_CURRENT", busbar."MAX_POWER_LOSS", busbar."CUBICLE_ID", 
          cubicle."PROJECT_ID", cubicle."COOLING_SYSTEM_ID", cubicle."HORIZONTAL_SEPERATION", cubicle."POSITION_ID", cubicle."LOUVER_AREA", 
          cubicle."HEIGHT", cubicle."WIDTH", cubicle."DEPTH", cubicle."TARGET_TEMPERATURE", cubicle."POWER_LOSS"
          FROM "BUS_BAR" busbar
          JOIN "CUBICLE" cubicle
          ON cubicle.id = busbar."CUBICLE_ID"
          WHERE busbar.id = $1;`

      var busBarDetails = await sails.sendNativeQuery(bbquery, [inputs.busBarId]);

      if (busBarDetails.rowCount == 0) {
        return exits.success({
          isSuccess: true,
          message : "warn",
          messageDetails : "Bus bar not found"
        });
      }

      var powerLossData = await sails.helpers.projectManagement.calculateBusbarPowerLoss(
        inputs.busBarType,
        inputs.heightAndThickness,
        inputs.inputCurrent,
        inputs.busBarlength,
        busBarDetails.rows[0].TARGET_TEMPERATURE,
        inputs.conductorTemperature
      );

      var editedBusBar = await BusBar.update({ id: busBarDetails.rows[0].BUS_BAR_ID }).set({
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
        id: editedBusBar.id,
        description: editedBusBar.description,
        arrangement: editedBusBar.busBarType,
        crossSection: editedBusBar.heightAndThickness,
        inputCurrent: editedBusBar.inputCurrent,
        busBarlength: editedBusBar.busBarlength,
        maxCurrent: editedBusBar.maxCurrent,
        maxPowerLoss: editedBusBar.maxPowerLoss,
        powerLoss: editedBusBar.powerLoss
      }

      await sails.helpers.projectManagement.updateCubiclePowerLoss(busBarDetails.rows[0].PROJECT_ID, busBarDetails.rows[0].CUBICLE_ID);

      return exits.success({
        isSuccess: true,
        message : "success",
        messageDetails : "Bus bar edited successfully",
        busBarDataVM: busBarDataVM,
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
