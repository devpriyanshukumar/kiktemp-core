module.exports = {


  friendlyName: 'Calculate cable power loss',


  description: '',


  inputs: {
    maximumCurrent: {
      type: 'number',
      required: true
    },

    conductorTemperature: {
      type: 'number',
      required: true
    },

    crossSectionalArea: {
      type: 'number',
      required: true
    },

    inputCurrent: {
      type: 'number',
      required: true
    },

    cableLength: {
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
    
    var r20 = await RefDataCableResistance.findOne({ crossSectionalArea: inputs.crossSectionalArea });

    var PLConst = r20.resistance * ( 1 + 0.004 * (inputs.conductorTemperature - 20));

    var actualPL = PLConst * Math.pow( inputs.inputCurrent , 2) * inputs.cableLength;
    
    var maxPLPerMeter = Math.pow( inputs.maximumCurrent , 2) * PLConst;

    return ({
      maxPowerLoss: Math.round((maxPLPerMeter+ Number.EPSILON)*100)/100,
      actualPowerLoss: Math.round((actualPL+ Number.EPSILON)*100)/100
    })
  }


};

