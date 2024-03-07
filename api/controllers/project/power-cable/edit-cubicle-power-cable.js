module.exports = {


  friendlyName: 'Edit cubicle power cable',


  description: '',


  inputs: {
    cableId: {
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
      description: 'Cable edited successfully',
    }
  },


  fn: async function (inputs, exits) {

    try {

      var cableQuery = `
          SELECT cable.id "CABLE_ID", cable."CUBICLE_ID", cable."DESCRIPTION", cable."CONDUCTOR_TEMPERATURE", cable."MAXIMUM_CURRENT", 
          cable."INSULATION_CORRECTION_FACTOR_ID", cable."INPUT_CURRENT", cable."CABLE_LENGTH", cable."POWER_LOSS", cable."MAXIMUM_POWER_LOSS",	
          cubicle."PROJECT_ID", cubicle."COOLING_SYSTEM_ID", cubicle."HORIZONTAL_SEPERATION", cubicle."POSITION_ID", cubicle."LOUVER_AREA", 
          cubicle."HEIGHT", cubicle."WIDTH", cubicle."DEPTH", cubicle."TARGET_TEMPERATURE", cubicle."POWER_LOSS"
          FROM "POWER_CABLE" cable
          JOIN "CUBICLE" cubicle
          ON cubicle.id = cable."CUBICLE_ID"
          WHERE cable.id = $1;`

      var cableDetails = await sails.sendNativeQuery(cableQuery, [inputs.cableId]);

      if (cableDetails.rowCount == 0) {
        return exits.success({
          isSuccess: true,
          editCableResponseDataVM: {
            topic: 'Power cable not found'
          }
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

      var editedCable = await PowerCable.update({ id: cableDetails.rows[0].CABLE_ID }).set({
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
        id: editedCable[0].id,
        cubicleId: editedCable[0].cubicleId,
        description: editedCable[0].description,
        conductorTemperature: editedCable[0].conductorTemperature,
        maximumCurrent: editedCable[0].maximumCurrent,
        currentCarryingCapacityId: editedCable[0].currentCarryingCapacityId,
        insulationCorrectionFactorId: editedCable[0].insulationCorrectionFactorId,
        inputCurrent: editedCable[0].inputCurrent,
        cableLength: editedCable[0].cableLength,
        maximumPowerLoss: editedCable[0].maximumPowerLoss,
        powerLoss: editedCable[0].powerLoss 
      }
      
      await sails.helpers.projectManagement.updateCubiclePowerLoss(cableDetails.rows[0].PROJECT_ID, cableDetails.rows[0].CUBICLE_ID);

      var editCableResponseDataVM = {
        topic: 'Cable edited successfully',
        cableDataVM: cableDataVM
      }

      return exits.success({
        message: 'success',
        messageDetails: 'Power cable edited successfully',
        isSuccess: true,
        editCableResponseDataVM: editCableResponseDataVM,
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
