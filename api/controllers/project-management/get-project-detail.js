module.exports = {


  friendlyName: 'Get project detail',

  description: '',

  inputs: {

    userId: {
      type: 'number',
      required: true
    },

    projectId: {
      type: 'number',
      required: true
    }
  },

  exits: {},

  fn: async function (inputs, exits) {

    try {

      var projectDetailQuery = `SELECT
        projectTbl."createdAt" AS "createdAt",
        projectTbl."id" AS "projectId",
        projectTbl."PROJECT_NAME" AS "projectName",
        projectTbl."INSTALLATION_TYPE_ID" AS "typeOfInstallationId",
        refTbl."VALUE" AS "typeOfInstallation",
        projectTbl."ELEVATION" AS "elevation",
        projectTbl."DEMAND_FACTOR" AS "demandFactor",
        projectTbl."AMBIENT_TEMP" AS "ambientTemperature",
        projectTbl."USER_ID" AS "userId",
        projectTbl."PROJECT_NO" AS "projectNo",
        (
          SELECT
            json_agg(
              jsonb_build_object(
                'createdAt', cubicleTbl."createdAt",
                'id', cubicleTbl.id,
                'COOLING_SYSTEM_ID', cubicleTbl."COOLING_SYSTEM_ID",
                'HORIZONTAL_SEPARATION', cubicleTbl."HORIZONTAL_SEPERATION",
                'POSITION_ID', cubicleTbl."POSITION_ID",
                'LOUVER_AREA', cubicleTbl."LOUVER_AREA",
                'HEIGHT', cubicleTbl."HEIGHT",
                'WIDTH', cubicleTbl."WIDTH",
                'DEPTH', cubicleTbl."DEPTH",
                'TARGET_TEMPERATURE', cubicleTbl."TARGET_TEMPERATURE",
                'POWER_LOSS', cubicleTbl."POWER_LOSS",
                'IS_EDITING', cubicleTbl."IS_EDITING"
              )
              ORDER BY cubicleTbl."createdAt"
            )
          FROM
            public."CUBICLE" cubicleTbl
          WHERE
            cubicleTbl."PROJECT_ID" = projectTbl."id"
        ) AS "cubicles"
      FROM
        "PROJECT" projectTbl
      JOIN
        "REF_DATA_MASTER" refTbl ON projectTbl."INSTALLATION_TYPE_ID" = refTbl.id
      WHERE projectTbl."USER_ID" = ($1) AND projectTbl."id" = ($2)`;

      var projectDetailArray = await sails.sendNativeQuery(projectDetailQuery, [inputs.userId, inputs.projectId]);
      if (projectDetailArray && projectDetailArray.rows && projectDetailArray.rows.length) {
        let projectDataVM = projectDetailArray.rows[0];

        projectDataVM.createdAt = await sails.helpers.service.convertDateEpochToStandard(projectDataVM.createdAt);

        if (projectDataVM.cubicles) {
          for (let i = 0; i < projectDataVM.cubicles.length; i++) {
            projectDataVM.cubicles[i].createdAt = await sails.helpers.service.convertDateEpochToStandard(projectDataVM.cubicles[i].createdAt);
          }
        }

        return exits.success({
          projectDataVM: projectDataVM,
          isSuccess: true
        });
      }
      else {
        return exits.success({
          isSuccess: false,
          message: "Project not exsists!"
        });
      }
    } catch (error) {
      sails.log.error(error);
      return this.res.serverError(error);
    }
  }
};