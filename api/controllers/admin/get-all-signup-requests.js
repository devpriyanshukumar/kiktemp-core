module.exports = {


  friendlyName: 'Get all signup requests',


  description: '',


  inputs: {
    pageNo: {
      type: 'number'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    try {
      var signupRequestListResponseDataVM = {};

      var signupRequestsQuery = `SELECT "createdAt" "REQUESTED_DATE", id "USER_ID", "EMAIL", "NAME", "USER_TYPE", "STATUS", "COUNTRY", "PHONE_NUMBER", "ORGANIZATION_NAME", "WEBSITE", COUNT(*) OVER() AS "COUNT"
      FROM public."USER"
      WHERE "STATUS" = 'requested'
      GROUP BY id
      ORDER BY "createdAt" DESC
      OFFSET ($1)*${sails.config.custom.tableRowsPerPage} LIMIT ${sails.config.custom.tableRowsPerPage};`;

      var signupRequestsArray = await sails.sendNativeQuery(signupRequestsQuery, [inputs.pageNo]);
      signupRequestsArray = signupRequestsArray.rows;

      for (let i = 0; i < signupRequestsArray.length; i++) {
        signupRequestsArray[i].REQUESTED_DATE = await sails.helpers.service.convertDateEpochToStandard(signupRequestsArray[i].REQUESTED_DATE);
      }

      signupRequestListResponseDataVM = {
        signupRequests: signupRequestsArray,
        totalRequests: signupRequestsArray.length === 0 ? 0 : signupRequestsArray[0].COUNT
      };

      return exits.success({
        signupRequestListResponseDataVM: signupRequestListResponseDataVM,
        isSuccess: true
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }


  }


};
