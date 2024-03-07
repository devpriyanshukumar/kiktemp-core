module.exports = {


  friendlyName: 'Get insulation correction factor',


  description: '',


  inputs: {
    cableInsulationId: {
      type: 'number',
      required: true
    },

    targetTemperature: {
      type: 'number',
      required: true
    },

    currentCarryingCapacity: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      statusCode: 200
    }
  },


  fn: async function (inputs, exits) {

    try {
      var targetTempArray = [30, 35, 40, 45, 50, 55, 60];
      if (!targetTempArray.includes(inputs.targetTemperature)) {
        return this.res.invalidTargetTemp();
      }

      var query = `
            SELECT correctionFactor.id, correctionFactor."CABLE_INSULATION" "CABLE_INSULATION_ID", refMaster."VALUE" "CABLE_INSULATION", correctionFactor."TARGET_TEMPERATURE", correctionFactor."CORRECTION_FACTOR"
            FROM "REF_DATA_CABLE_INSULATION_CORRECTION_FACTOR" correctionFactor
            JOIN "REF_DATA_MASTER" refMaster
            ON correctionFactor."CABLE_INSULATION" = refMaster.id
            WHERE correctionFactor."CABLE_INSULATION" = $1 AND 
            correctionFactor."TARGET_TEMPERATURE" = $2;`;

      var insulationCorrectionFactor = await sails.sendNativeQuery(query, [inputs.cableInsulationId, inputs.targetTemperature]);

      var maxCurrent = insulationCorrectionFactor.rows[0].CORRECTION_FACTOR * inputs.currentCarryingCapacity

      return exits.success({
        isSuccess: true,
        maxCurrent: Math.round((maxCurrent+ Number.EPSILON)*100)/100,
        insulationCorrectionFactor: insulationCorrectionFactor.rows[0]
      });

    } catch (error) {
      sails.log.error(error);

      return this.res.serverError(error);
    }

  }


};
