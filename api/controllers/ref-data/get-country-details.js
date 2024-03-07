module.exports = {


  friendlyName: 'Get country details',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      statusCode: 200
    }
  },


  fn: async function (inputs, exits) {

    try {

      var query = `SELECT id, "COUNTRY" country, "COUNTRY_CODE" code, "PHONE_NUMBER_COUNT" minLength
      FROM "REF_DATA_COUNTRY"
      ORDER BY id ASC; `;

      var countryDetails = await sails.sendNativeQuery(query);

      return exits.success({
        countryDetails: countryDetails.rows
      });
      
    } catch (error) {
      sails.log.error(error);

      return this.res.serverError(error);
    }

  }


};
