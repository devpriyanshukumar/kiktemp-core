module.exports = {


  friendlyName: 'Delete cubicle power cable',


  description: '',


  inputs: {
    cableId: {
      type: 'number',
      required: true
    }

  },


  exits: {
    success: {
      description: 'Cable deleted successfully',
    },
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

      var resTopic = '';
      var message = '';
      var deletedRecord;

      if (cableDetails.rowCount > 0) {
        deletedRecord = await PowerCable.destroyOne({ id: cableDetails.rows[0].CABLE_ID });

        await sails.helpers.projectManagement.updateCubiclePowerLoss(cableDetails.rows[0].PROJECT_ID, cableDetails.rows[0].CUBICLE_ID);

        resTopic = 'Cable deleted successfully';
        message = 'success';

      } else {
        resTopic = 'Record not found';
        message = 'warn';
      }

      var deleteCableResponseDataVM = {
        deletedRecord: deletedRecord
      }

      return exits.success({
        messageDetails: resTopic,
        message : message,
        isSuccess: true,
        deleteCableResponseDataVM: deleteCableResponseDataVM
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
