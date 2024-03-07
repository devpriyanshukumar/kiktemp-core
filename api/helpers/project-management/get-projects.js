module.exports = {


  friendlyName: 'Search project',


  description: '',


  inputs: {
    tabName: {
      type: 'string',
      required: true
    },

    userId: {
      type: 'number',
      required: true
    },

    userType: {
      type: 'string',
      required: true
    },

    searchString: {
      type: 'string'
    },

    pageNo: {
      type: 'number',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {

    var query = `
    SELECT projectTbl."createdAt" "CREATED_DATE", projectTbl.id "PROJECT_ID", projectTbl."PROJECT_NAME", projectTbl."ELEVATION", projectTbl."DEMAND_FACTOR", 
    projectTbl."AMBIENT_TEMP", projectTbl."INSTALLATION_TYPE_ID", refDataInstallationType."VALUE" "INSTALLATION_TYPE", projectTbl."PROJECT_NO",
    userTbl.id "USER_ID", userTbl."NAME", userTbl."USER_TYPE", userTbl."STATUS", userTbl."ORGANIZATION_NAME", userTbl."PARENT_ID",
    parentTbl.id "PARENT_ID", parentTbl."NAME" "PARENT_NAME", parentTbl."USER_TYPE" "PARENT_USER_TYPE", parentTbl."STATUS" "PARENT_STATUS", 
    parentTbl."ORGANIZATION_NAME" "PARENT_ORGANIZATION_NAME",
    COUNT(*) OVER() AS "COUNT"
      FROM "PROJECT" projectTbl
      JOIN "REF_DATA_MASTER" refDataInstallationType
      ON refDataInstallationType.ID = projectTbl."INSTALLATION_TYPE_ID"
      JOIN "USER" userTbl
      ON userTbl.id = projectTbl."USER_ID"
      LEFT JOIN "USER" parentTbl
      ON parentTbl.id = userTbl."PARENT_ID"
      WHERE userTbl."STATUS" = 'verified'`

    var dataArray = [inputs.pageNo-1, inputs.userId];

    if (inputs.tabName.toLowerCase() === 'allprojects') {
      if (inputs.userType.toLowerCase() === 'admin') {
        query = query + ` AND userTbl.id != $2`;

      } else if (inputs.userType.toLowerCase() === 'distributor') {
        query = query + ` AND projectTbl."USER_ID" IN (SELECT id FROM "USER" WHERE "PARENT_ID" = $2)`;
      }

    } else if (inputs.tabName.toLowerCase() === 'myprojects') {
      dataArray.push(inputs.userType);
      query = query + ` AND userTbl.id = $2 AND userTbl."USER_TYPE" = $${dataArray.length}`;
    }

    if (inputs.searchString) {
      dataArray.push('%' + inputs.searchString.toLowerCase() + '%');
      query = query + ` AND (LOWER(projectTbl."PROJECT_NAME") LIKE $${dataArray.length} OR LOWER(projectTbl."PROJECT_NO") LIKE $${dataArray.length})`;
    }

    query = query + ` ORDER BY projectTbl."createdAt" DESC
                      OFFSET ($1)*${sails.config.custom.tableRowsPerPage} LIMIT ${sails.config.custom.tableRowsPerPage};`;

    var projectsArray = await sails.sendNativeQuery(query, dataArray);

    for (let i = 0; i < projectsArray.rows.length; i++) {
      projectsArray.rows[i].CREATED_DATE = await sails.helpers.service.convertDateEpochToStandard(projectsArray.rows[i].CREATED_DATE);
    }

    return projectsArray.rows;
  }


};

