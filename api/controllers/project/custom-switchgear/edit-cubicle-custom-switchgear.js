module.exports = {


  friendlyName: 'Edit cubicle custom switchgear',


  description: '',


  inputs: {
    customSwitchGearId: {
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
      description: 'Custom switchgear edited successfully',
    },
  },


  fn: async function (inputs, exits) {

    try {
      var powerLoss = inputs.unitPowerLoss * inputs.quantity;
      var actualPowerLoss = Math.round((powerLoss + Number.EPSILON) * 100) / 100;

      var csQuery = `
        SELECT cSwitchgear.id "CUSTOM_SWITCHGEAR_ID", cSwitchgear."MANUFACTURER", cSwitchgear."MODEL", cSwitchgear."QUANTITY", cSwitchgear."RATING", 
        cSwitchgear."UNIT_POWER_LOSS", cSwitchgear."POWER_LOSS", cSwitchgear."CUBICLE_ID",
        cubicle."PROJECT_ID", cubicle."COOLING_SYSTEM_ID", cubicle."HORIZONTAL_SEPERATION", cubicle."POSITION_ID", cubicle."LOUVER_AREA", 
        cubicle."HEIGHT", cubicle."WIDTH", cubicle."DEPTH", cubicle."TARGET_TEMPERATURE", cubicle."POWER_LOSS"
        FROM "CUSTOM_SWITCH_GEAR" cSwitchgear
        JOIN "CUBICLE" cubicle
        ON cubicle.id = cSwitchgear."CUBICLE_ID"
        WHERE cSwitchgear.id = $1;`

      var customSwitchGearDetails = await sails.sendNativeQuery(csQuery, [inputs.customSwitchGearId]);

      if (customSwitchGearDetails.rowCount === 0) {
        return exits.success({
          isSuccess: true,
          message: "warn",
          messageDetails : "Custom Switchgear not found"
        });
      }

      var editedCustomSwitchGear = await CustomSwitchGear.updateOne({ id: customSwitchGearDetails.rows[0].CUSTOM_SWITCHGEAR_ID }).set({
        manufacturer: inputs.manufacturer,
        model: inputs.model,
        quantity: inputs.quantity,
        rating: inputs.rating,
        unitPowerLoss: inputs.unitPowerLoss,
        powerLoss: actualPowerLoss
      })

      var editCustomSwitchgearDataVM = {
        id: editedCustomSwitchGear.id,
        cubicleId: editedCustomSwitchGear.cubicleId,
        maufacturer: editedCustomSwitchGear.manufacturer,
        model: editedCustomSwitchGear.model,
        quantity: editedCustomSwitchGear.quantity,
        rating: editedCustomSwitchGear.rating,
        unitPowerLoss: editedCustomSwitchGear.unitPowerLoss,
        powerLoss: editedCustomSwitchGear.powerLoss
      }

      await sails.helpers.projectManagement.updateCubiclePowerLoss(customSwitchGearDetails.rows[0].PROJECT_ID, customSwitchGearDetails.rows[0].CUBICLE_ID);

      var editCustomSwitchgearResponseDataVM = {
        topic: 'Custom switchgear edited successfully',
        editCustomSwitchgearDataVM: editCustomSwitchgearDataVM
      }

      return exits.success({
        isSuccess: true,
        message : 'Success',
        messageDetails : 'Custom switchgear edited successfully',
        editCustomSwitchgearDataVM: editCustomSwitchgearDataVM
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
