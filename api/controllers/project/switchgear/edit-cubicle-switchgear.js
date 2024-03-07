module.exports = {


  friendlyName: 'Edit cubicle switchgear',


  description: '',


  inputs: {
    id: {
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
      description: 'Switchgear edited successfully',
    },
  },


  fn: async function (inputs, exits) {

    try {
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

      var sgQuery = `
          SELECT switchgear.id "SWITCHGEAR_ID", switchgear."QUANTITY", switchgear."POWER_LOSS", switchgear."REF_SWITCHGEAR_ID", 
          switchgear."OPERATING_CURRENT", switchgear."CUBICLE_ID", 
          cubicle."PROJECT_ID", cubicle."COOLING_SYSTEM_ID", cubicle."HORIZONTAL_SEPERATION", cubicle."POSITION_ID", cubicle."LOUVER_AREA", 
          cubicle."HEIGHT", cubicle."WIDTH", cubicle."DEPTH", cubicle."TARGET_TEMPERATURE", cubicle."POWER_LOSS"
          FROM "SWITCH_GEAR" switchgear
          JOIN "CUBICLE" cubicle
          ON cubicle.id = switchgear."CUBICLE_ID"
          WHERE switchgear.id = $1;`

      var switchGearDetails = await sails.sendNativeQuery(sgQuery, [inputs.id]);

      if (switchGearDetails.rowCount === 0) {
        return exits.success({
          isSuccess: true,
          editSwitchgearResponseDataVM: {
            topic: 'Switchgear not found'
          }
        });
      }

      var editedSwitchgear = await SwitchGear.updateOne({ id: switchGearDetails.rows[0].SWITCHGEAR_ID }).set({
        switchGearId: inputs.refSwitchGearId,
        quantity: inputs.quantity,
        powerLoss: actualPowerLoss
      })

      var switchgearDataVM = {
        maufacturer: refDataSwitchgearData.maufacturer,
        type: refDataSwitchgearData.type,
        range: refDataSwitchgearData.range,
        model: refDataSwitchgearData.model,
        ratedCurrent: refDataSwitchgearData.ratedCurrent,
        ratedPowerLoss: refDataSwitchgearData.ratedPowerLoss,
        quantity: editedSwitchgear.quantity,
        actualPowerLoss: actualPowerLoss,
        operatingCurrent: inputs.operatingCurrent
      }

      await sails.helpers.projectManagement.updateCubiclePowerLoss(switchGearDetails.rows[0].PROJECT_ID, switchGearDetails.rows[0].CUBICLE_ID);

      var editSwitchgearResponseDataVM = {
        topic: 'Switchgear edited successfully',
        switchgearDataVM: switchgearDataVM
      }

      return exits.success({
        message: 'success',
        messageDetails: 'Switchgear edited successfully',
        isSuccess: true,
        editSwitchgearResponseDataVM: editSwitchgearResponseDataVM,
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
