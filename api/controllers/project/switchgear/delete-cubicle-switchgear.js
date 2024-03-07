module.exports = {


  friendlyName: 'Delete cubicle switchgear',


  description: '',


  inputs: {
    switchGearId: {
      type: 'number',
      required: true
    },
  },


  exits: {
    success: {
      description: 'Switchgear deleted successfully',
    },
  },


  fn: async function (inputs, exits) {

    try {

      var sgQuery = `
          SELECT switchgear.id "SWITCHGEAR_ID", switchgear."QUANTITY", switchgear."POWER_LOSS", switchgear."REF_SWITCHGEAR_ID", 
          switchgear."OPERATING_CURRENT", switchgear."CUBICLE_ID", 
          cubicle."PROJECT_ID", cubicle."COOLING_SYSTEM_ID", cubicle."HORIZONTAL_SEPERATION", cubicle."POSITION_ID", cubicle."LOUVER_AREA", 
          cubicle."HEIGHT", cubicle."WIDTH", cubicle."DEPTH", cubicle."TARGET_TEMPERATURE", cubicle."POWER_LOSS"
          FROM "SWITCH_GEAR" switchgear
          JOIN "CUBICLE" cubicle
          ON cubicle.id = switchgear."CUBICLE_ID"
          WHERE switchgear.id = $1;`

      var switchGearDetails = await sails.sendNativeQuery(sgQuery, [inputs.switchGearId]);

      var resTopic = '';
      var deletedRecord;

      if (switchGearDetails.rowCount > 0) {
        deletedRecord = await SwitchGear.destroyOne({ id: switchGearDetails.rows[0].SWITCHGEAR_ID });
        await sails.helpers.projectManagement.updateCubiclePowerLoss(switchGearDetails.rows[0].PROJECT_ID, switchGearDetails.rows[0].CUBICLE_ID);
        
        messageDetail = 'Switchgear deleted successfully';
        message = 'success';

      } else {
        messageDetail = 'Record not found';
        message = 'warn';
      }

      var deleteSwitchgearResponseDataVM = {
        deletedRecord: deletedRecord
      }

      return exits.success({
        isSuccess: true,
        message: message,
        messageDetails: messageDetail,
        deleteSwitchgearResponseDataVM: deleteSwitchgearResponseDataVM,
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
