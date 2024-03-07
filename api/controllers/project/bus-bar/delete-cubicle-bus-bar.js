module.exports = {


  friendlyName: 'Delete cubicle bus bar',


  description: '',


  inputs: {
    projectId: {
      type: 'number',
      required: true
    },

    busBarId: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Bus bar deleted successfully',
    },
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

      var resTopic = '';
      var message = '';
      var deletedRecord;

      if (busBarDetails.rowCount > 0) {
        deletedRecord = await BusBar.destroyOne({ id: busBarDetails.rows[0].BUS_BAR_ID });

        await sails.helpers.projectManagement.updateCubiclePowerLoss(busBarDetails.rows[0].PROJECT_ID, busBarDetails.rows[0].CUBICLE_ID);

        resTopic = 'Bus bar deleted successfully';
        message = 'success';

      } else {
        resTopic = 'Record not found';
        message = 'warn';
      }

      var deleteBusBarResponseDataVM = {
        deletedRecord: deletedRecord
      }

      return exits.success({
        message: message,
        messageDetails: resTopic,
        isSuccess: true,
        deleteBusBarResponseDataVM: deleteBusBarResponseDataVM,
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
