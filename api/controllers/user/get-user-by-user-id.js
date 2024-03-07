module.exports = {


  friendlyName: 'Get user by user id',


  description: '',


  inputs: {
    userId: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Cables found successfully',
    },
  },


  fn: async function (inputs, exits) {

    try {

      var query = `
            SELECT 
            u."createdAt" AS user_createdDate, u.id AS user_id,
            u."EMAIL" AS user_EMAIL, u."NAME" AS user_NAME,
            u."PASSWORD" AS user_PASSWORD, u."USER_TYPE" AS user_USER_TYPE,
            u."STATUS" AS user_STATUS, u."COUNTRY" AS user_COUNTRY,
            u."PHONE_NUMBER" AS user_PHONE_NUMBER, u."ORGANIZATION_NAME" AS user_ORGANIZATION_NAME,
            u."WEBSITE" AS user_WEBSITE, u."PARENT_ID" AS user_PARENT_ID,
            jsonb_agg(jsonb_build_object(
                'CREATED_DATE', p."createdAt",
                'id', p.id,
                'PROJECT_NAME', p."PROJECT_NAME",
                'ELEVATION', p."ELEVATION",
                'DEMAND_FACTOR', p."DEMAND_FACTOR",
                'AMBIENT_TEMP', p."AMBIENT_TEMP",
                'USER_ID', p."USER_ID",
                'INSTALLATION_TYPE_ID', p."INSTALLATION_TYPE_ID", 
                'INSTALLATION_TYPE', rd."VALUE", 
                'PROJECT_NO', p."PROJECT_NO"
                ) ORDER BY p."createdAt" DESC) AS projects
            FROM 
                "USER" u
            JOIN 
                "PROJECT" p ON u.id = p."USER_ID"
            LEFT JOIN 
                "REF_DATA_MASTER" rd ON p."INSTALLATION_TYPE_ID" = rd.id  -- Join with refDataMaster
            WHERE 
                u.id = $1
            GROUP BY 
                u."createdAt", u.id, u."EMAIL", u."NAME", u."PASSWORD", u."USER_TYPE",
                u."STATUS", u."COUNTRY", u."PHONE_NUMBER", u."ORGANIZATION_NAME", 
                u."WEBSITE", u."PARENT_ID", rd."VALUE";`;

      var userDetails = await sails.sendNativeQuery(query, [inputs.userId]);

      if (userDetails.rowCount === 0) {
        return this.res.userNotFound();
      }

      userDetails.rows[0].user_createddate = await sails.helpers.service.convertDateEpochToStandard(userDetails.rows[0].user_createddate);
      for (let i = 0; i < userDetails.rows[0].projects.length; i++) {
        userDetails.rows[0].projects[i].CREATED_DATE = await sails.helpers.service.convertDateEpochToStandard(userDetails.rows[0].projects[i].CREATED_DATE);
      }

      return exits.success({
        isSuccess: true,
        message: "User data found successfully",
        userDetails: userDetails.rows
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }

  }


};
