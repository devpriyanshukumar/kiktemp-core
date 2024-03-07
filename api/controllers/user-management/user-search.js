module.exports = {

  friendlyName: 'User search',
  description: '',

  inputs: {
    pageNo: {
      type: 'number',
      required: true
    },

    searchString: {
      type: 'string'
    },

    childUserType: {
      type: 'string'
    },

    parentId: {
      type: 'number'
    }
  },

  exits: {
  },

  fn: async function (inputs, exits) {

    try {
      var query = `
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
        WHERE `;

      var conditons = `child."USER_TYPE" != 'admin' AND child."STATUS" != 'requested'
              AND (LOWER(child."ORGANIZATION_NAME") LIKE $2
              OR LOWER(child."EMAIL") LIKE $2
              OR LOWER(child."NAME") LIKE $2
              OR LOWER(parent."ORGANIZATION_NAME") LIKE $2)
              ORDER BY child."createdAt" DESC
              OFFSET ($1)*${sails.config.custom.tableRowsPerPage} LIMIT ${sails.config.custom.tableRowsPerPage};`

      var finalQuery;
      var dataArray = [inputs.pageNo, '%' + inputs.searchString.toLowerCase() + '%'];

      if (inputs.childUserType !== '') {
        if (inputs.parentId !== 0) {
          finalQuery = query + `child."USER_TYPE" = $3 AND child."PARENT_ID" = $4 AND ` + conditons;
          dataArray.push(inputs.childUserType, inputs.parentId);
        } else {
          finalQuery = query + `child."USER_TYPE" = $3 AND ` + conditons;
          dataArray.push(inputs.childUserType);
        }
      } else {
        if (inputs.parentId !== 0) {
          finalQuery = query + `child."PARENT_ID" = $3 AND ` + conditons;
          dataArray.push(inputs.parentId);
        } else {
          finalQuery = query + conditons;
        }
      }

      var searchResultsArray = await sails.sendNativeQuery(finalQuery, dataArray);
      searchResultsArray = searchResultsArray.rows;

      for (let i = 0; i < searchResultsArray.length; i++) {
        searchResultsArray[i].JOINED_DATE = await sails.helpers.service.convertDateEpochToStandard(searchResultsArray[i].JOINED_DATE);
      }

      userSearchResponseDataVM = {
        searchResultDataVM: searchResultsArray,
        totalResults: searchResultsArray.length === 0 ? 0 : searchResultsArray[0].COUNT
      };

      return exits.success({
        userSearchResponseDataVM: userSearchResponseDataVM,
        isSuccess: true
      });

    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }
  }
};