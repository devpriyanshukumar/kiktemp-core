module.exports = {


  friendlyName: 'Get bus bar cross section list',


  description: '',


  inputs: {
    busBarType: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Bus bar cross section list got successfully'
    }
  },


  fn: async function (inputs, exits) {

    try {

      var query = `SELECT "HEIGHT_AND_THICKNESS" size
      FROM "REF_DATA_BUS_BAR"
      WHERE LOWER("BUS_BAR_TYPE") = $1
      ORDER BY id;`

      var sizeList = await sails.sendNativeQuery(query, [inputs.busBarType.toLowerCase()]);

      const sizeListArray = sizeList.rows.map((obj, index) => ({
        id: index + 1,
        value: obj.size
      }));

      return exits.success({
        sizeList: sizeListArray
      });
  
    } catch (error) {
      sails.log.error(error);

      return this.res.serverError(error);
    }
  }


};
