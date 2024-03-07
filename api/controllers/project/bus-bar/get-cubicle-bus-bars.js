module.exports = {


  friendlyName: 'Get cubicle bus bars',


  description: '',


  inputs: {
    cubicleId: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Bus bars found successfully',
    },
  },


  fn: async function (inputs, exits) {

    try {

      var busBarData = await sails.helpers.projectManagement.getBusBarData(inputs.cubicleId);

      if (busBarData.count == 0) {
        return exits.success({
          isSuccess: true,
          busbarResponseDataVM: {
            topic: 'No record found'
          }
        });
      }

      var busbarResponseDataVM = {
        topic: 'Bus bar data found successfully',
        count: busBarData.count,
        totalPowerLoss: busBarData.totalPowerLoss,
        busBarDataVMs: busBarData.busBarDataVMs
      }

      return exits.success({
        isSuccess: true,
        busbarResponseDataVM: busbarResponseDataVM,
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
