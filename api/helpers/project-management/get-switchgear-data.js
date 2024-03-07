module.exports = {


  friendlyName: 'Get switchgear data',


  description: '',


  inputs: {
    cubicleId: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Switchgear found successfully',
    },
  },


  fn: async function (inputs) {

    var query = `SELECT switchgear."createdAt" "CREATED_DATE", switchgear.id, switchgear."QUANTITY" AS "quantity", switchgear."OPERATING_CURRENT" AS "operatingCurrent", switchgear."POWER_LOSS" AS "powerLoss", switchgear."CUBICLE_ID" AS "cubicleId", 
        switchgear."REF_SWITCHGEAR_ID" "refSwitchGearId", refDataSwitchGear."MANUFACTURER" AS "manufacture", refDataSwitchGear."TYPE" AS "type", refDataSwitchGear."RANGE" AS "range", 
        refDataSwitchGear."MODEL" AS "modalName", refDataSwitchGear."RATED_CURRENT" AS ratedCurrent, refDataSwitchGear."RATED_POWER_LOSS" ratedPowerLoss
          FROM "SWITCH_GEAR" switchgear
          JOIN "REF_DATA_SWITCH_GEAR" refDataSwitchGear
          ON switchgear."REF_SWITCHGEAR_ID" = refDataSwitchGear.id
          WHERE switchgear."CUBICLE_ID" = $1
          ORDER BY switchgear."createdAt" ASC;`

      var switchgearArray = await sails.sendNativeQuery(query, [inputs.cubicleId]);

      var totalPowerLoss = 0;
      for (let i = 0; i < switchgearArray.rows.length; i++) {
        switchgearArray.rows[i].CREATED_DATE = await sails.helpers.service.convertDateEpochToStandard(switchgearArray.rows[i].CREATED_DATE);
        totalPowerLoss += switchgearArray.rows[i].powerLoss;
      }

      var switchgearData = {
        topic: 'Switchgear data found successfully',
        count: switchgearArray.rowCount,
        totalPowerLoss: Math.round((totalPowerLoss+ Number.EPSILON)*100)/100,
        switchgearDataVMs: switchgearArray.rows
      }

      return switchgearData

  }


};

