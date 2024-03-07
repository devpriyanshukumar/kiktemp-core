module.exports = {


  friendlyName: 'Get ref data',


  description: '',


  inputs: {
    categoryArray: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Matched ref data got successfully'
    }
  },


  fn: async function (inputs, exits) {

    try {

      var categoryArray = JSON.parse(inputs.categoryArray);

      var filteredData = await RefDataMaster.find({ category: categoryArray });

      const groupedData = filteredData.reduce((acc, item) => {
        const { category, id, value, index } = item;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({ id, value, index });
        return acc;
      }, {});


      return exits.success({
        refData: groupedData
      });

    } catch (error) {
      sails.log.error(error);

      return this.res.serverError(error);
    }

  }


};
