module.exports = {


  friendlyName: 'Get bus bar data',


  description: '',


  inputs: {
    cubicleId: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Bus bar found successfully',
    }
  },


  fn: async function (inputs) {

    var query = `SELECT "createdAt" "CREATED_DATE", id, "DESCRIPTION" AS "description", "BUS_BAR_TYPE" AS "busBarType", 
      "HEIGHT_AND_THICKNESS" AS "heightAndThickness", "INPUT_CURRENT" AS "inputCurrent", "BUS_BAR_LENGTH" AS "busBarlength", 
      "POWER_LOSS" AS "powerLossW", "CUBICLE_ID" AS "cubicleId", 
      "MAX_CURRENT" AS "maximumCurrent", "MAX_POWER_LOSS" AS "powerLossWM", "CONDUCTOR_TEMPERATURE" AS conductorTemperature
      FROM "BUS_BAR"
      WHERE "CUBICLE_ID" = $1
      ORDER BY "createdAt" ASC;`

      var busBarArray = await sails.sendNativeQuery(query, [inputs.cubicleId]);

      var totalPowerLoss = 0;
      for (let i = 0; i < busBarArray.rows.length; i++) {
        busBarArray.rows[i].CREATED_DATE = await sails.helpers.service.convertDateEpochToStandard(busBarArray.rows[i].CREATED_DATE);
        totalPowerLoss += busBarArray.rows[i].powerLossW;
      }

      var busBarData = {
        count: busBarArray.rowCount,
        totalPowerLoss: Math.round((totalPowerLoss+ Number.EPSILON)*100)/100,
        busBarDataVMs: busBarArray.rows
      }

      return busBarData;

  }


};

