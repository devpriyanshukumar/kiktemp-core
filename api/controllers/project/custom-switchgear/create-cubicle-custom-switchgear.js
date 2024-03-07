module.exports = {


  friendlyName: 'Create cubicle custom switchgear',


  description: '',


  inputs: {
    cubicleId: {
      type: 'number',
      required: true
    },

    manufacturer: {
      type: 'string',
      required: true
    },

    model: {
      type: 'string',
      required: true
    },

    quantity: {
      type: 'number',
      required: true
    },

    rating: {
      type: 'number',
      required: true
    },

    unitPowerLoss: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Custom switchgear saved successfully',
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

      var powerLoss = inputs.unitPowerLoss * inputs.quantity;
      var actualPowerLoss = Math.round((powerLoss + Number.EPSILON) * 100) / 100;

      let newCustomSwitchgear = await CustomSwitchGear.create({
        cubicleId: inputs.cubicleId,
        manufacturer: inputs.manufacturer,
        model: inputs.model,
        quantity: inputs.quantity,
        rating: inputs.rating,
        unitPowerLoss: inputs.unitPowerLoss,
        powerLoss: actualPowerLoss
      }).fetch();

      var customSwitchgearDataVM = {
        id: newCustomSwitchgear.id,
        cubicleId: newCustomSwitchgear.cubicleId,
        maufacturer: newCustomSwitchgear.manufacturer,
        model: newCustomSwitchgear.model,
        quantity: newCustomSwitchgear.quantity,
        rating: newCustomSwitchgear.rating,
        unitPowerLoss: newCustomSwitchgear.unitPowerLoss,
        powerLoss: newCustomSwitchgear.powerLoss
      }

      var cubicleDetails = await Cubicle.findOne({ id: inputs.cubicleId });
      await sails.helpers.projectManagement.updateCubiclePowerLoss(cubicleDetails.projectId, inputs.cubicleId);

      return exits.success({
        isSuccess: true,
        message: "success",
        messageDetails: "Custom switchgear added successfully",
        createCustomSwitchgearResponseDataVM: customSwitchgearDataVM
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
