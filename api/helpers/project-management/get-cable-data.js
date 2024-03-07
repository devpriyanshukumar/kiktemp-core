module.exports = {


  friendlyName: 'Get cable data',


  description: '',


  inputs: {
    cubicleId: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Cables found successfully',
    }
  },


  fn: async function (inputs) {

    var query = `SELECT powerCable."createdAt" "CREATED_DATE", powerCable.id, powerCable."CUBICLE_ID", powerCable."DESCRIPTION", powerCable."CONDUCTOR_TEMPERATURE", powerCable."MAXIMUM_CURRENT", 
    powerCable."CURRENT_CARRYING_CAPACITY_ID", refCCCapacity."CONDUCTOR_TEMPERATURE", 
    refCCCapacity."CABLE_ARRANGEMENT" "CABLE_ARRANGEMENT_ID", refCableArrangement."VALUE" "CABLE_ARRANGEMENT", 
    refCCCapacity."CABLE_INSTALLATION_TYPE" "CABLE_INSTALLATION_TYPE_ID", refinstallationType."VALUE" "CABLE_INSTALLATION_TYPE",
    refCCCapacity."CABLE_INSTALLATION_METHOD" "CABLE_INSTALLATION_METHOD_ID", refCCCapacity."CROSS_SECTIONAL_AREA", refCCCapacity."CURRENT_CARRYING_CAPACITY",
    powerCable."INSULATION_CORRECTION_FACTOR_ID", insulationCorrectionFactor."CABLE_INSULATION" "CABLE_INSULATION_ID", refCableInsulation."VALUE" "CABLE_INSULATION", 
    insulationCorrectionFactor."TARGET_TEMPERATURE", insulationCorrectionFactor."CORRECTION_FACTOR",
    powerCable."INPUT_CURRENT", powerCable."CABLE_LENGTH", powerCable."POWER_LOSS", powerCable."MAXIMUM_POWER_LOSS"
      FROM "POWER_CABLE" powerCable
      JOIN "REF_DATA_CABLE_CURRENT_CARRYING_CAPACITY" refCCCapacity
      ON powerCable."CURRENT_CARRYING_CAPACITY_ID" = refCCCapacity.id
      JOIN "REF_DATA_MASTER" refCableArrangement
      ON refCableArrangement.id = refCCCapacity."CABLE_ARRANGEMENT"
      JOIN "REF_DATA_MASTER" refinstallationType
      ON refinstallationType.id = refCCCapacity."CABLE_INSTALLATION_TYPE"
      JOIN "REF_DATA_CABLE_INSULATION_CORRECTION_FACTOR" insulationCorrectionFactor
      on insulationCorrectionFactor.id = powerCable."INSULATION_CORRECTION_FACTOR_ID"
      JOIN "REF_DATA_MASTER" refCableInsulation
      ON refCableInsulation.id = insulationCorrectionFactor."CABLE_INSULATION"
      WHERE powerCable."CUBICLE_ID" = $1
      ORDER BY powerCable."createdAt" ASC;`

        var cablesArray = await sails.sendNativeQuery(query, [inputs.cubicleId]);

        var totalPowerLoss = 0;
        for (let i = 0; i < cablesArray.rows.length; i++) {
          cablesArray.rows[i].CREATED_DATE = await sails.helpers.service.convertDateEpochToStandard(cablesArray.rows[i].CREATED_DATE);
          totalPowerLoss += cablesArray.rows[i].POWER_LOSS;

          if (cablesArray.rows[i].CABLE_INSTALLATION_METHOD_ID !== 0) {
            var installationMethod = await RefDataMaster.findOne({
              id: cablesArray.rows[i].CABLE_INSTALLATION_METHOD_ID
            })
    
            cablesArray.rows[i].CABLE_INSTALLATION_METHOD = installationMethod.value;
          }
        }
  
        var powerCabledData = {
          count: cablesArray.rowCount,
          totalPowerLoss: Math.round((totalPowerLoss+ Number.EPSILON)*100)/100,
          powerCabledDataVMs: cablesArray.rows
        }
  
        return powerCabledData;

  }


};

