module.exports = {


  friendlyName: 'Get cubicle custom switchgear',


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


  fn: async function (inputs, exits) {

    try {

      var customSwitchgearData = await sails.helpers.projectManagement.getCustomSwitchgearData(inputs.cubicleId);

      if (customSwitchgearData.count == 0) {
        return exits.success({
          isSuccess: true,
          customSwitchgearResponseDataVM: {
            topic: 'No record found'
          }
        });
      }

      var customSwitchgearResponseDataVM = {
        topic: 'Custom switchgear data found successfully',
        count: customSwitchgearData.count,
        totalPowerLoss: customSwitchgearData.totalPowerLoss,
        customSwitchgearDataVMs: customSwitchgearData.customSwitchgearDataVMs
      }

      return exits.success({
        isSuccess: true,
        customSwitchgearResponseDataVM: customSwitchgearResponseDataVM,
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
