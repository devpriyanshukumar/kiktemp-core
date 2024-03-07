module.exports = {


  friendlyName: 'Get matched routes',


  description: '',


  inputs: {
    userType: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Router Matched Successfully'
    }
  },


  fn: async function (inputs, exits) {

    try {
      
      const matchedRoutes = await sails.helpers.refData.databaseGetMatchingRoutes(
        inputs.userType
      );

      var MatchedRouteResponseDataVM = {
        matchedRoutes: matchedRoutes
      }

      return exits.success({
        MatchedRouteResponseDataVM: MatchedRouteResponseDataVM,
        isSuccess: true
      });

    } catch (error) {
      sails.log.error(error);

      return this.res.serverError(error);
    }

  }


};
