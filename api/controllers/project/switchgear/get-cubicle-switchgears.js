module.exports = {


  friendlyName: 'Get cubicle switchgear',


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


  fn: async function (inputs, exits) {

    try {

      var switchgearData = await sails.helpers.projectManagement.getSwitchgearData(inputs.cubicleId);

      if (switchgearData.count == 0) {
        return exits.success({
          isSuccess: true,
          switchgearResponseDataVM: {
            topic: 'No record found'
          }
        });
      }

      var switchgearResponseDataVM = {
        topic: 'Switchgear data found successfully',
        count: switchgearData.count,
        totalPowerLoss: switchgearData.totalPowerLoss,
        switchgearDataVMs: switchgearData.switchgearDataVMs
      }

      return exits.success({
        isSuccess: true,
        switchgearResponseDataVM: switchgearResponseDataVM,
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
