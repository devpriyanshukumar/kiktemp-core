module.exports = {


  friendlyName: 'Get cubicle data',


  description: '',


  inputs: {
    cubicleId: {
      type: 'number',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Cubicle data',
    },

  },


  fn: async function (inputs) {

    var query = `SELECT cubicle."createdAt" "CREATED_DATE", cubicle.id, cubicle."COOLING_SYSTEM_ID", refDataCooling."VALUE" "COOLING_SYSTEM_TYPE", 
        cubicle."HORIZONTAL_SEPERATION", cubicle."POSITION_ID", refDataPosition."VALUE" "CUBICLE_POSITION", cubicle."LOUVER_AREA", cubicle."HEIGHT", 
        cubicle."WIDTH", cubicle."DEPTH", cubicle."TARGET_TEMPERATURE", cubicle."POWER_LOSS", cubicle."PROJECT_ID", project."PROJECT_NAME", 
        project."INSTALLATION_TYPE_ID", refDataInstallationType."VALUE" "INSTALLATION_TYPE", project."ELEVATION", project."DEMAND_FACTOR", project."AMBIENT_TEMP", 
        project."PROJECT_NO", project."USER_ID", userTbl."NAME" "USER_NAME"
        FROM "CUBICLE" cubicle
        JOIN "REF_DATA_MASTER" refDataCooling
          ON cubicle."COOLING_SYSTEM_ID" = refDataCooling.id
        JOIN "REF_DATA_MASTER" refDataPosition
          ON cubicle."POSITION_ID" = refDataPosition.id
        JOIN "PROJECT" project
          ON cubicle."PROJECT_ID" = project.id
        JOIN "REF_DATA_MASTER" refDataInstallationType
          ON project."INSTALLATION_TYPE_ID" = refDataInstallationType.id
        LEFT JOIN "USER" userTbl
          ON userTbl.id = project."USER_ID"
        WHERE cubicle.id = $1
        ORDER BY cubicle."createdAt" ASC;`

    var cubicleArray = await sails.sendNativeQuery(query, [inputs.cubicleId]);

    if(cubicleArray && cubicleArray.rows && cubicleArray.rows.length > 0) {
      cubicleArray.rows[0].CREATED_DATE = await sails.helpers.service.convertDateEpochToStandard(cubicleArray.rows[0].CREATED_DATE);
  
      return cubicleArray.rows[0];
    }
    else {
      return null;
    }

  }


};

