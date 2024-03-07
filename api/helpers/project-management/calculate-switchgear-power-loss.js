module.exports = {


  friendlyName: 'Calculate switchgear power loss',


  description: '',


  inputs: {
    ratedPowerLoss: {
      type: 'number',
      required: true
    },

    ratedCurrent: {
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
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    
    var perPowerLoss = (inputs.ratedPowerLoss * Math.pow(inputs.operatingCurrent, 2)) / Math.pow(inputs.ratedCurrent, 2);

    var switchgearActualPL = perPowerLoss * inputs.quantity;

    return Math.round((switchgearActualPL+ Number.EPSILON)*100)/100;
  }


};

