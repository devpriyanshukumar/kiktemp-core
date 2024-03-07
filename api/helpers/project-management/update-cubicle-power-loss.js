module.exports = {


  friendlyName: 'Updat cubicle powerloss',


  description: '',


  inputs: {
    projectId: {
      type: "number",
      required: true
    },

    cubicleId: {
      type: "number",
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var totalPowerLoss = 0;
    var busBarData = await BusBar.find({ cubicleId: inputs.cubicleId });
    if (busBarData.length !== 0) {
      busBarData.forEach(element => {
        totalPowerLoss += element.powerLoss;
      });
    }

    var customSwitchgearData = await CustomSwitchGear.find({ cubicleId: inputs.cubicleId });
    if (customSwitchgearData.length !== 0) {
      customSwitchgearData.forEach(element => {
        totalPowerLoss += element.powerLoss;
      });
    }

    var switchgearData = await SwitchGear.find({ cubicleId: inputs.cubicleId });
    if (switchgearData.length !== 0) {
      switchgearData.forEach(element => {
        totalPowerLoss += element.powerLoss;
      });
    }

    var cableData = await PowerCable.find({ cubicleId: inputs.cubicleId });
    if (cableData.length !== 0) {
      cableData.forEach(element => {
        totalPowerLoss += element.powerLoss;
      });
    }

    var projectDetails = await Project.findOne({id: inputs.projectId})

    await Cubicle.update({ id: inputs.cubicleId }).set({
      powerLoss: Math.round(((totalPowerLoss * Math.pow(projectDetails.demandFactor, 2)) + Number.EPSILON)*100)/100
    });

    return;
  }


};

