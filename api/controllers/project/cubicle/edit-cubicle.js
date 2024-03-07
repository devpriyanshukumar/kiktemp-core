module.exports = {


  friendlyName: 'Edit cubicle',


  description: '',


  inputs: {
    cubicleId: {
      type: 'number',
      required: true
    },

    coolingSystemId: {
      type: 'number',
      required: true
    },

    horizontalSeparation: {
      type: 'number',
      required: true
    },

    positionId: {
      type: 'number',
      required: true
    },

    louverArea: {
      type: 'number',
      required: true
    },

    height: {
      type: 'number',
      required: true
    },

    width: {
      type: 'number',
      required: true
    },

    depth: {
      type: 'number',
      required: true
    },

    targetTemperature: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Cubicle edited successfully',
    }
  },


  fn: async function (inputs, exits) {

    try {
      var targetTempArray = [30, 35, 40, 45, 50, 55, 60];
      if (!targetTempArray.includes(inputs.targetTemperature)) {
        return this.res.invalidTargetTemp();
      }

      var cubicleDetails = await Cubicle.findOne({ id: inputs.cubicleId });

      if (!cubicleDetails) {
        return exits.success({
          isSuccess: true,
          editCubicleResponseDataVM: {
            topic: 'Record not found'
          }
        });
      }

      if (cubicleDetails.targetTemperature !== inputs.targetTemperature) {
        var busBars = await BusBar.find({ cubicleId: inputs.cubicleId });

        if (busBars.length > 0) {
          for (let i = 0; i < busBars.length; i++) {
            var powerLossData = await sails.helpers.projectManagement.calculateBusbarPowerLoss(
              busBars[i].busBarType,
              busBars[i].heightAndThickness,
              busBars[i].inputCurrent,
              busBars[i].busBarlength,
              inputs.targetTemperature,
              busBars[i].conductorTemperature
            );

            var editedBusBar = await BusBar.update({ id: busBars[i].id }).set({
              powerLoss: powerLossData.actualPowerLoss,
              maxCurrent: powerLossData.maxCurrent,
              maxPowerLoss: powerLossData.maxPowerLoss
            }).fetch();

          }

        }

        var powerCables = await PowerCable.find({ cubicleId: inputs.cubicleId });

        if (powerCables.length > 0) {
          var query = `
            SELECT correctionFactor.id, correctionFactor."CABLE_INSULATION" "CABLE_INSULATION_ID", refMaster."VALUE" "CABLE_INSULATION", correctionFactor."TARGET_TEMPERATURE", correctionFactor."CORRECTION_FACTOR"
            FROM "REF_DATA_CABLE_INSULATION_CORRECTION_FACTOR" correctionFactor
            JOIN "REF_DATA_MASTER" refMaster
            ON correctionFactor."CABLE_INSULATION" = refMaster.id
            WHERE correctionFactor."CABLE_INSULATION" = $1 AND 
            correctionFactor."TARGET_TEMPERATURE" = $2;`;

          for (let i = 0; i < powerCables.length; i++) {
            var insulationFactor = await RefDataCableInsulationCorrectionFactor.findOne({ id: powerCables[i].insulationCorrectionFactorId });
            var currentCarryingCapacity = await RefDataCableCurrentCarryingCapacity.findOne({ id: powerCables[i].currentCarryingCapacityId })

            var insulationCorrectionFactor = await sails.sendNativeQuery(query, [insulationFactor.cableInsulation, inputs.targetTemperature]);

            var maxCurrent = insulationCorrectionFactor.rows[0].CORRECTION_FACTOR * currentCarryingCapacity.currentCarryingCapacity;

            var powerLossData = await sails.helpers.projectManagement.calculateCablePowerLoss(
              Math.round((maxCurrent + Number.EPSILON) * 100) / 100,
              powerCables[i].conductorTemperature,
              currentCarryingCapacity.crossSectionalArea,
              powerCables[i].inputCurrent,
              powerCables[i].cableLength
            );

            var editedCable = await PowerCable.update({ id: powerCables[i].id }).set({
              maximumCurrent: Math.round((maxCurrent + Number.EPSILON) * 100) / 100,
              insulationCorrectionFactorId: insulationCorrectionFactor.rows[0].id,
              maximumPowerLoss: powerLossData.maxPowerLoss,
              powerLoss: powerLossData.actualPowerLoss
            }).fetch();

          }

        }

        if (busBars.length > 0 || powerCables.length > 0) {
          await sails.helpers.projectManagement.updateCubiclePowerLoss(cubicleDetails.projectId, inputs.cubicleId);
        }
      }

      var editedCubicle = await Cubicle.updateOne({ id: cubicleDetails.id }).set({
        coolingSystemId: inputs.coolingSystemId,
        horizontalSeperation: inputs.horizontalSeparation,
        positionId: inputs.positionId,
        louverArea: inputs.louverArea,
        height: inputs.height,
        width: inputs.width,
        depth: inputs.depth,
        targetTemperature: inputs.targetTemperature
      });

      var cubicleDataVM = {
        id: editedCubicle.id,
        projectId: editedCubicle.projectId,
        coolingSystemId: editedCubicle.coolingSystemId,
        horizontalSeperation: editedCubicle.horizontalSeparation,
        positionId: editedCubicle.positionId,
        louverArea: editedCubicle.louverArea,
        height: editedCubicle.height,
        width: editedCubicle.width,
        depth: editedCubicle.depth,
        targetTemperature: editedCubicle.targetTemperature,
        powerLoss: editedCubicle.powerLoss
      }

      return exits.success({
        isSuccess: true,
        message: 'success',
        messageDetails: 'Cubicle edited successfully',
        editCubicleResponseDataVM: {
          cubicleDataVM: cubicleDataVM
        }
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
