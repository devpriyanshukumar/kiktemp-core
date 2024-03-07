module.exports = {

  friendlyName: 'Get User details',
  description: 'Get User details',

  inputs: {
    childId: {
      type: 'number'
    }
  },

  exits: {
  },

  fn: async function (inputs, exits) {

    try {
      var selectUserDetailQuery = `
      SELECT child."createdAt" "JOINED_DATE",
      child.id "CHILD_USER_ID",
      child."EMAIL" "CHILD_EMAIL",
      child."NAME" "CHILD_NAME",
      child."USER_TYPE" "CHILD_USER_TYPE", 
      child."STATUS" "CHILD_STATUS",
      child."COUNTRY" "CHILD_COUNTRY",
      child."PHONE_NUMBER" "CHILD_PHONE_NUMBER", 
      child."ORGANIZATION_NAME" "CHILD_ORGANIZATION",
      child."WEBSITE" "CHILD_WEBSITE",
      parent.id "PARENT_USER_ID", 
      parent."EMAIL" "PARENT_EMAIL",
      parent."NAME" "PARENT_NAME",
      parent."USER_TYPE" "PARENT_USER_TYPE", 
      parent."STATUS" "PARENT_STATUS",
      parent."COUNTRY" "PARENT_COUNTRY",
      parent."PHONE_NUMBER" "PARENT_PHONE_NUMBER", 
      parent."ORGANIZATION_NAME" "PARENT_ORGANIZATION",
      parent."WEBSITE" "PARENT_WEBSITE",
      COUNT(*) OVER() AS "COUNT"
      FROM "USER" child
      LEFT JOIN "USER" parent ON child."PARENT_ID" = parent.id
      WHERE child.id =  $1;`

      var selectUserDetailArray = await sails.sendNativeQuery(selectUserDetailQuery, [inputs.childId]);
      selectUserDetailArray = selectUserDetailArray.rows;
      selectUserDetailArray[0].JOINED_DATE = await sails.helpers.service.convertDateEpochToStandard(selectUserDetailArray[0].JOINED_DATE);

      return exits.success({
        userDetailVM: selectUserDetailArray[0],
        isSuccess: true
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }
  }
};