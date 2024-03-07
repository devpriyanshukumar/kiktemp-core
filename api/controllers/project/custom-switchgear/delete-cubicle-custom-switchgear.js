module.exports = {


  friendlyName: 'Delete cubicle custom switchgear',


  description: '',


  inputs: {
    customSwitchGearId: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Custom Switchgear deleted successfully',
    },
  },


  fn: async function (inputs, exits) {

    try {

      var csQuery = `
        SELECT cSwitchgear.id "CUSTOM_SWITCHGEAR_ID", cSwitchgear."MANUFACTURER", cSwitchgear."MODEL", cSwitchgear."QUANTITY", cSwitchgear."RATING", 
        cSwitchgear."UNIT_POWER_LOSS", cSwitchgear."POWER_LOSS", cSwitchgear."CUBICLE_ID",
        cubicle."PROJECT_ID", cubicle."COOLING_SYSTEM_ID", cubicle."HORIZONTAL_SEPERATION", cubicle."POSITION_ID", cubicle."LOUVER_AREA", 
        cubicle."HEIGHT", cubicle."WIDTH", cubicle."DEPTH", cubicle."TARGET_TEMPERATURE", cubicle."POWER_LOSS"
        FROM "CUSTOM_SWITCH_GEAR" cSwitchgear
        JOIN "CUBICLE" cubicle
        ON cubicle.id = cSwitchgear."CUBICLE_ID"
        WHERE cSwitchgear.id = $1;`

      var customSwitchGearDetails = await sails.sendNativeQuery(csQuery, [inputs.customSwitchGearId]);

      var resTopic = '';
      var message = '';
      var deletedRecord;

      if (customSwitchGearDetails.rowCount > 0) {
        deletedRecord = await CustomSwitchGear.destroyOne({ id: customSwitchGearDetails.rows[0].CUSTOM_SWITCHGEAR_ID });
        await sails.helpers.projectManagement.updateCubiclePowerLoss(customSwitchGearDetails.rows[0].PROJECT_ID, customSwitchGearDetails.rows[0].CUBICLE_ID);
        
        message = "success"
        resTopic = 'Custom switchgear deleted successfully';

      } else {
        message = "warn"
        resTopic = 'Record not found';
      }

      return exits.success({
        isSuccess: true,
        messageDetails: resTopic,
        message: message,
        deletedRecord: deletedRecord,
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
