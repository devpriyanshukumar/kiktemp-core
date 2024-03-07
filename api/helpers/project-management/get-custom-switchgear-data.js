module.exports = {


  friendlyName: 'Get custom switchgear data',


  description: '',


  inputs: {
    cubicleId: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Custom switchgear found successfully',
    },
  },


  fn: async function (inputs) {

    var query = `SELECT "createdAt" "CREATED_DATE", id AS "customSwitchGearId", "MANUFACTURER" AS "manufacturer", "MODEL" AS "model", "QUANTITY" AS "quantity", "RATING" AS "rating",
          "UNIT_POWER_LOSS" AS "unitPowerLoss", "POWER_LOSS" AS "powerLoss", "CUBICLE_ID" AS "cubicleId"
          FROM "CUSTOM_SWITCH_GEAR"
          WHERE "CUBICLE_ID" = $1
          ORDER BY "createdAt" ASC;`

      var customSwitchgearArray = await sails.sendNativeQuery(query, [inputs.cubicleId]);

      var totalPowerLoss = 0;
      for (let i = 0; i < customSwitchgearArray.rows.length; i++) {
        customSwitchgearArray.rows[i].CREATED_DATE = await sails.helpers.service.convertDateEpochToStandard(customSwitchgearArray.rows[i].CREATED_DATE);
        totalPowerLoss += customSwitchgearArray.rows[i].powerLoss;
      }

      var customSwitchgearData = {
        count: customSwitchgearArray.rowCount,
        totalPowerLoss: Math.round((totalPowerLoss+ Number.EPSILON)*100)/100,
        customSwitchgearDataVMs: customSwitchgearArray.rows
      }

      return customSwitchgearData;

  }


};

