module.exports = {


  friendlyName: 'Delete cubicle',


  description: '',


  inputs: {
    CubicleId: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Cubicle deleted successfully',
    },
  },


  fn: async function (inputs, exits) {

    try {
      var cubicleDetails = await Cubicle.findOne({ id: inputs.CubicleId });

      if (!cubicleDetails) {
        return exits.success({
          isSuccess: true,
          message: 'warn',
          messageDetails: 'Record not found'
        });
      }

      await Promise.all([
        BusBar.destroy({ cubicleId: inputs.CubicleId }),
        SwitchGear.destroy({ cubicleId: inputs.CubicleId }),
        CustomSwitchGear.destroy({ cubicleId: inputs.CubicleId }),
        PowerCable.destroy({ cubicleId: inputs.CubicleId }),
        Cubicle.destroyOne({ id: cubicleDetails.id })
      ]);

      return exits.success({
        isSuccess: true,
        message: 'success',
        messageDetails: 'Cubicle deleted successfully'
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }
  }
};
