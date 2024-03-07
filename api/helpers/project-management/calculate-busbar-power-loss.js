module.exports = {


  friendlyName: 'Calculate power loss',


  description: '',


  inputs: {
    busBarType: {
      type: 'string',
      required: true
    },

    heightAndThickness: {
      type: 'string',
      required: true
    },

    inputCurrent: {
      type: 'string',
      required: true
    },

    busBarlength: {
      type: 'number',
      required: true
    },

    targetTemperature: {
      type: 'number',
      required: true
    },

    conductorTemperature: {
      type: 'number',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {

    var refDataBusBarK4 = await RefDataBusBarK4.findOne({
      targetTemperature: inputs.targetTemperature,
      conductorTemperature: inputs.conductorTemperature
    });

    var busBarRefData = await RefDataBusBar.findOne({
      busBarType: inputs.busBarType,
      heightAndThickness: inputs.heightAndThickness
    })

    var pLPerMeter = (Math.pow(busBarRefData.operatingCurrent, 2) * busBarRefData.k3 * (1 + 0.004 * (inputs.conductorTemperature - 20))) / (56 * busBarRefData.crossSectionArea);

    var busBarActualPL = (pLPerMeter * refDataBusBarK4.k4 * Math.pow(inputs.inputCurrent, 2)) / (Math.pow(busBarRefData.operatingCurrent, 2));
    var actualPowerLoss = busBarActualPL * inputs.busBarlength;
    
    return ({
      maxPowerLoss: Math.round((pLPerMeter+ Number.EPSILON)*100)/100,
      maxCurrent: busBarRefData.operatingCurrent,
      actualPowerLoss: Math.round((actualPowerLoss+ Number.EPSILON)*100)/100
    })
  }


};

