module.exports = {


  friendlyName: 'Get cubicle data',


  description: '',


  inputs: {
    cubicleId: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Cubicle found successfully',
    },
  },


  fn: async function (inputs, exits) {

    try {
      var cubicleData = await sails.helpers.projectManagement.getCubicleData(inputs.cubicleId);
      if (!cubicleData) {
        return exits.success({
          isSuccess: true,
          cubicleResponseDataVM: {
            topic: 'No record found'
          }
        });
      }

      var cubicleOverViewGeneralDataVM = {
        positionId: cubicleData.POSITION_ID,
        coolingSystemId: cubicleData.COOLING_SYSTEM_ID,
        coolingSystem: cubicleData.COOLING_SYSTEM_TYPE,
        horizontalSeparation: cubicleData.HORIZONTAL_SEPERATION,
        position: cubicleData.CUBICLE_POSITION,
        louverArea: cubicleData.LOUVER_AREA,
        height: cubicleData.HEIGHT,
        width: cubicleData.WIDTH,
        depth: cubicleData.DEPTH,
        targetTemperature: cubicleData.TARGET_TEMPERATURE,
        cubiclePowerLoss: cubicleData.POWER_LOSS
      }

      var busBarData = await sails.helpers.projectManagement.getBusBarData(inputs.cubicleId);
      var customSwitchgearData = await sails.helpers.projectManagement.getCustomSwitchgearData(inputs.cubicleId);
      var switchgearData = await sails.helpers.projectManagement.getSwitchgearData(inputs.cubicleId);
      var powerCableData = await sails.helpers.projectManagement.getCableData(inputs.cubicleId);

      var cubicleOverviewDataVM = {
        projectId: cubicleData.projectId,
        cubicleId: cubicleData.id,
        cubicleOverViewGeneralDataVM: cubicleOverViewGeneralDataVM,
        powerCableDataVMs: powerCableData,
        busBarDataVMs: busBarData,
        switchgearDataVMs: switchgearData,
        customSwitchgearDataVMs: customSwitchgearData
      }

      return exits.success({
        isSuccess: true,
        message: 'success',
        messageDetails: 'Cubicle data found successfully',
        cubicleDataVM: cubicleOverviewDataVM
      });


    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error); 
    }

  }


};
