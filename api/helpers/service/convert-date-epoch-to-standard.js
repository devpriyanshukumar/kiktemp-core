module.exports = {


  friendlyName: 'Convert date epoch to standard',


  description: '',


  inputs: {
    epochTime: {
      type: 'string',
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {

    const date = new Date(parseInt(inputs.epochTime));
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;

  }


};

