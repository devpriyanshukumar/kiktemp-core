module.exports = {


  friendlyName: 'Get current carrying capacity data',


  description: '',


  inputs: {
    conductorTemperature: {
      type: 'number'
    },

    cableArrangementId: {
      type: 'number'
    },

    cableIstallationTypeId: {
      type: 'number'
    },

    cableIstallationMethodId: {
      type: 'number'
    },

    crossSectionalArea: {
      type: 'number'
    }
  },


  exits: {
    success: {
      statusCode: 200
    }
  },


  fn: async function (inputs, exits) {

    try {

      if (inputs.conductorTemperature && inputs.cableArrangementId && inputs.cableIstallationTypeId && (inputs.cableIstallationMethodId === 0 || inputs.cableIstallationMethodId) && inputs.crossSectionalArea) {
        var currentCarryingCapacityQuery = '';
        if (inputs.cableIstallationMethodId === 0) {
          currentCarryingCapacityQuery = `
                      SELECT ccCap.id, ccCap."CONDUCTOR_TEMPERATURE", ccCap."CABLE_ARRANGEMENT" "CABLE_ARRANGEMENT_ID", refCableArrangement."VALUE" "CABLE_ARRANGEMENT", 
                      ccCap."CABLE_INSTALLATION_TYPE" "CABLE_INSTALLATION_TYPE_ID", refInstallationType."VALUE" "CABLE_INSTALLATION_TYPE", 
                      ccCap."CABLE_INSTALLATION_METHOD" "CABLE_INSTALLATION_METHOD_ID", ccCap."CROSS_SECTIONAL_AREA", ccCap."CURRENT_CARRYING_CAPACITY"
                        FROM "REF_DATA_CABLE_CURRENT_CARRYING_CAPACITY" ccCap
                        JOIN "REF_DATA_MASTER" refCableArrangement
                        on refCableArrangement.id = ccCap."CABLE_ARRANGEMENT"
                        JOIN "REF_DATA_MASTER" refInstallationType
                        on refInstallationType.id = ccCap."CABLE_INSTALLATION_TYPE"
                        WHERE ccCap."CONDUCTOR_TEMPERATURE" = $1 AND
                        ccCap."CABLE_ARRANGEMENT" = $2 AND
                        ccCap."CABLE_INSTALLATION_TYPE" = $3 AND
                        ccCap."CABLE_INSTALLATION_METHOD" = $4 AND 
                        ccCap."CROSS_SECTIONAL_AREA" = $5;`;

        } else {
          currentCarryingCapacityQuery = `
                      SELECT ccCap.id, ccCap."CONDUCTOR_TEMPERATURE", ccCap."CABLE_ARRANGEMENT" "CABLE_ARRANGEMENT_ID", refCableArrangement."VALUE" "CABLE_ARRANGEMENT", 
                      ccCap."CABLE_INSTALLATION_TYPE" "CABLE_INSTALLATION_TYPE_ID", refInstallationType."VALUE" "CABLE_INSTALLATION_TYPE", 
                      ccCap."CABLE_INSTALLATION_METHOD" "CABLE_INSTALLATION_METHOD_ID", refInstallationMethod."VALUE" "CABLE_INSTALLATION_METHOD", ccCap."CROSS_SECTIONAL_AREA", ccCap."CURRENT_CARRYING_CAPACITY"
                        FROM "REF_DATA_CABLE_CURRENT_CARRYING_CAPACITY" ccCap
                        JOIN "REF_DATA_MASTER" refCableArrangement
                        on refCableArrangement.id = ccCap."CABLE_ARRANGEMENT"
                        JOIN "REF_DATA_MASTER" refInstallationType
                        on refInstallationType.id = ccCap."CABLE_INSTALLATION_TYPE"
                        JOIN "REF_DATA_MASTER" refInstallationMethod
                        on refInstallationMethod.id = ccCap."CABLE_INSTALLATION_METHOD"
                        WHERE ccCap."CONDUCTOR_TEMPERATURE" = $1 AND
                        ccCap."CABLE_ARRANGEMENT" = $2 AND
                        ccCap."CABLE_INSTALLATION_TYPE" = $3 AND
                        ccCap."CABLE_INSTALLATION_METHOD" = $4 AND 
                        ccCap."CROSS_SECTIONAL_AREA" = $5;`;
        }


        var currentCarryingCapacity = await sails.sendNativeQuery(currentCarryingCapacityQuery,
          [inputs.conductorTemperature, inputs.cableArrangementId, inputs.cableIstallationTypeId, inputs.cableIstallationMethodId, inputs.crossSectionalArea]);

        return exits.success({
          currentCarryingCapacity: currentCarryingCapacity.rows[0]
        });
      }

      if (inputs.conductorTemperature && inputs.cableArrangementId && inputs.cableIstallationTypeId && (inputs.cableIstallationMethodId === 0 || inputs.cableIstallationMethodId)) {

        var crossSectionalAreaQuery = `
                            SELECT ccCap."CROSS_SECTIONAL_AREA", id 
                            FROM "REF_DATA_CABLE_CURRENT_CARRYING_CAPACITY" ccCap
                            WHERE ccCap."CONDUCTOR_TEMPERATURE" = $1 AND
                            ccCap."CABLE_ARRANGEMENT" = $2 AND
                            ccCap."CABLE_INSTALLATION_TYPE" = $3 AND
                            ccCap."CABLE_INSTALLATION_METHOD" = $4
                            ORDER BY id;`;

        var crossSectionalAreaList = await sails.sendNativeQuery(crossSectionalAreaQuery,
          [inputs.conductorTemperature, inputs.cableArrangementId, inputs.cableIstallationTypeId, inputs.cableIstallationMethodId]);

        const crossSectionalAreaArray = crossSectionalAreaList.rows.map((obj, index) => ({
          id: index + 1,
          value: obj.CROSS_SECTIONAL_AREA
        }));

        return exits.success({
          crossSectionalAreaArray: crossSectionalAreaArray
        });
      }

      if (inputs.conductorTemperature && inputs.cableArrangementId && inputs.cableIstallationTypeId) {
        var cableIstallationMethodQuery = `
                      SELECT ccCap."CABLE_INSTALLATION_METHOD", refMaster."VALUE", MIN(ccCap.id) AS id 
                      FROM "REF_DATA_CABLE_CURRENT_CARRYING_CAPACITY" ccCap
                      JOIN "REF_DATA_MASTER" refMaster
                      on refMaster.id = ccCap."CABLE_INSTALLATION_METHOD"
                      WHERE ccCap."CONDUCTOR_TEMPERATURE" = $1 AND
                      ccCap."CABLE_ARRANGEMENT" = $2 AND
                      ccCap."CABLE_INSTALLATION_TYPE" = $3
                      GROUP BY ccCap."CONDUCTOR_TEMPERATURE", ccCap."CABLE_ARRANGEMENT", 
                      ccCap."CABLE_INSTALLATION_TYPE", ccCap."CABLE_INSTALLATION_METHOD", refMaster."VALUE"
                      ORDER BY id;`;

        var cableIstallationMethodList = await sails.sendNativeQuery(cableIstallationMethodQuery, [inputs.conductorTemperature, inputs.cableArrangementId, inputs.cableIstallationTypeId]);

        var cableIstallationMethodArray = [{
          id: 1,
          refId: 0,
          value: ''
        }]

        if (cableIstallationMethodList.rows.length > 0) {
          cableIstallationMethodArray = cableIstallationMethodList.rows.map((obj, index) => ({
            id: index + 1,
            refId: obj.CABLE_INSTALLATION_METHOD,
            value: obj.VALUE
          }));
        }

        return exits.success({
          cableIstallationMethodArray: cableIstallationMethodArray
        });
      }

      if (inputs.conductorTemperature && inputs.cableArrangementId) {
        var cableIstallationTypeQuery = `
                    SELECT ccCap."CABLE_INSTALLATION_TYPE", refMaster."VALUE", MIN(ccCap.id) AS id 
                    FROM "REF_DATA_CABLE_CURRENT_CARRYING_CAPACITY" ccCap
                    JOIN "REF_DATA_MASTER" refMaster
                    on refMaster.id = ccCap."CABLE_INSTALLATION_TYPE"
                    WHERE ccCap."CONDUCTOR_TEMPERATURE" = $1 AND
                    ccCap."CABLE_ARRANGEMENT" = $2
                    GROUP BY ccCap."CONDUCTOR_TEMPERATURE", ccCap."CABLE_ARRANGEMENT", 
                    ccCap."CABLE_INSTALLATION_TYPE", refMaster."VALUE"
                    ORDER BY id;`;

        var cableIstallationTypeList = await sails.sendNativeQuery(cableIstallationTypeQuery, [inputs.conductorTemperature, inputs.cableArrangementId]);

        const cableIstallationTypeArray = cableIstallationTypeList.rows.map((obj, index) => ({
          id: index + 1,
          refId: obj.CABLE_INSTALLATION_TYPE,
          value: obj.VALUE
        }));

        return exits.success({
          cableIstallationTypeArray: cableIstallationTypeArray
        });
      }

      if (inputs.conductorTemperature) {
        var cableArrangementQuery = `
                    SELECT ccCap."CABLE_ARRANGEMENT", refMaster."VALUE", MIN(ccCap.id) AS id 
                    FROM "REF_DATA_CABLE_CURRENT_CARRYING_CAPACITY" ccCap
                    JOIN "REF_DATA_MASTER" refMaster
                    on refMaster.id = ccCap."CABLE_ARRANGEMENT"
                    WHERE ccCap."CONDUCTOR_TEMPERATURE" = $1
                    GROUP BY ccCap."CONDUCTOR_TEMPERATURE", ccCap."CABLE_ARRANGEMENT", refMaster."VALUE"
                    ORDER BY id;`;

        var cableArrangementList = await sails.sendNativeQuery(cableArrangementQuery, [inputs.conductorTemperature]);

        const cableArrangementArray = cableArrangementList.rows.map((obj, index) => ({
          id: index + 1,
          refId: obj.CABLE_ARRANGEMENT,
          value: obj.VALUE
        }));

        return exits.success({
          cableArrangementArray: cableArrangementArray
        });
      }

      var conductorTempQuery = `
                  SELECT DISTINCT "CONDUCTOR_TEMPERATURE", MIN(id) AS id 
                  FROM "REF_DATA_CABLE_CURRENT_CARRYING_CAPACITY"
                  GROUP BY "CONDUCTOR_TEMPERATURE"
                  ORDER BY id;`;

      var conductorTempList = await sails.sendNativeQuery(conductorTempQuery);

      const conductorTempArray = conductorTempList.rows.map((obj, index) => ({
        id: index + 1,
        value: obj.CONDUCTOR_TEMPERATURE
      }));

      return exits.success({
        conductorTempArray: conductorTempArray
      });

    } catch (error) {
      sails.log.error(error);

      return this.res.serverError(error);
    }

  }


};
