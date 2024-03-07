module.exports = {


  friendlyName: 'Manage cubicle switchgear',


  description: '',


  inputs: {
    cubicleId: {
      type: 'number',
      required: true
    },

    refSwitchGearId: {
      type: 'number',
      required: true
    },

    operatingCurrent: {
      type: 'number',
      required: true
    },

    quantity: {
      type: 'number',
      required: true
    }

  },


  exits: {
    success: {
      description: 'Switchgear saved successfully',
    },
  },


  fn: async function (inputs, exits) {

    try {
      var cubicleData = await Cubicle.findOne({ id: inputs.cubicleId });

      if (!cubicleData) {
        return exits.success({
          isSuccess: true,
          message: "warn",
          messageDetails: "Cubicle related to bus bar not found"
        });
      }

      var refDataSwitchgearData = await RefDataSwitchGear.findOne({ id: inputs.refSwitchGearId });

      if (!refDataSwitchgearData || refDataSwitchgearData === null) {
        return this.res.dataNotFound();
      }

      var actualPowerLoss = await sails.helpers.projectManagement.calculateSwitchgearPowerLoss(
        refDataSwitchgearData.ratedPowerLoss,
        refDataSwitchgearData.ratedCurrent,
        inputs.operatingCurrent,
        inputs.quantity
      );

      let newSwitchgear = await SwitchGear.create({
        cubicleId: inputs.cubicleId,
        refSwitchGearId: inputs.refSwitchGearId,
        quantity: inputs.quantity,
        powerLoss: actualPowerLoss,
        operatingCurrent: inputs.operatingCurrent
      }).fetch();

      var switchgearDataVM = {
        id: newSwitchgear.id,
        maufacturer: refDataSwitchgearData.maufacturer,
        type: refDataSwitchgearData.type,
        range: refDataSwitchgearData.range,
        model: refDataSwitchgearData.model,
        ratedCurrent: refDataSwitchgearData.ratedCurrent,
        ratedPowerLoss: refDataSwitchgearData.ratedPowerLoss,
        quantity: newSwitchgear.quantity,
        actualPowerLoss: actualPowerLoss,
        operatingCurrent: inputs.operatingCurrent
      }

      var cubicleDetails = await Cubicle.findOne({ id: inputs.cubicleId });
      await sails.helpers.projectManagement.updateCubiclePowerLoss(cubicleDetails.projectId, inputs.cubicleId);

      var createSwitchgearResponseDataVM = {
        topic: 'Switchgear added successfully',
        switchgearDataVM: switchgearDataVM
      }

      return exits.success({
        message: 'success',
        messageDetails: 'Switchgear added successfully',
        isSuccess: true,
        createSwitchgearResponseDataVM: createSwitchgearResponseDataVM,
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
