module.exports = {

  friendlyName: 'Get all signup requests',
  description: '',

  inputs: {
    userId: {
      type: 'number',
      required: true
    }
  },

  exits: {
  },

  fn: async function (inputs, exits) {

    try {
      var signupRequestResponse = {};

      var signupRequestsQuery = `SELECT "createdAt" "REQUESTED_DATE", id "userId", "EMAIL" "email", "NAME" "name", "USER_TYPE" "userType", "STATUS" "status", "COUNTRY" "country",
       "PHONE_NUMBER" "contactNumber", "ORGANIZATION_NAME" "organizationName", "WEBSITE" "webSite"
      FROM public."USER"
      WHERE "STATUS" = 'requested' AND "id" = ($1);`;

      var signupRequestsArray = await sails.sendNativeQuery(signupRequestsQuery, [inputs.userId]);
      signupRequestsArray = signupRequestsArray.rows;

      signupRequestsArray[0].REQUESTED_DATE = await sails.helpers.service.convertDateEpochToStandard(signupRequestsArray[0].REQUESTED_DATE);
      
      return exits.success({
        signupRequestDataVM: signupRequestsArray[0],
        isSuccess: true
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }
  }
};
