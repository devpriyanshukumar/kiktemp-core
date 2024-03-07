module.exports = {


  friendlyName: 'Get cubicle power cable',


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
    },
  },


  fn: async function (inputs, exits) {

    try {

      var cableData = await sails.helpers.projectManagement.getCableData(inputs.cubicleId);

      if (cableData.count == 0) {
        return exits.success({
          isSuccess: true,
          cabledResponseDataVM: {
            topic: 'No record found'
          }
        });
      }

      var cabledResponseDataVM = {
        topic: 'Cable data found successfully',
        count: cableData.count,
        totalPowerLoss: cableData.totalPowerLoss,
        cableDataVMs: cableData.powerCabledDataVMs
      }

      return exits.success({
        isSuccess: true,
        cabledResponseDataVM: cabledResponseDataVM,
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
