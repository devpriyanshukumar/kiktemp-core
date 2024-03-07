module.exports = {


  friendlyName: 'Get switch gear data',


  description: '',


  inputs: {
    manufacturer: {
      type: 'string'
    },

    type: {
      type: 'string'
    },

    range: {
      type: 'string'
    },

    model: {
      type: 'string'
    }

  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Switchgear data found successfully'
    }
  },


  fn: async function (inputs, exits) {

    try {
      if (inputs.manufacturer && inputs.type && inputs.range && inputs.model) {
        var refDataSwitchgearQuery = `
                    SELECT id, "MANUFACTURER", "TYPE", "RANGE", "MODEL"
                    FROM "REF_DATA_SWITCH_GEAR"
                    WHERE LOWER("MANUFACTURER") = $1 AND LOWER("TYPE") = $2 AND LOWER("RANGE") = $3 AND LOWER("MODEL") = $4
                    ORDER BY id;`

        var refDataSwitchgear = await sails.sendNativeQuery(
                                        refDataSwitchgearQuery, 
                                        [inputs.manufacturer.toLowerCase(), inputs.type.toLowerCase(), inputs.range.toLowerCase(), inputs.model.toLowerCase()]);

        return exits.success({
          refDataSwitchgear: refDataSwitchgear.rows[0]
        });
      }

      if (inputs.manufacturer && inputs.type && inputs.range) {
        var modelQuery = `
                  SELECT "MODEL", MIN(id) AS id
                  FROM "REF_DATA_SWITCH_GEAR"
                  WHERE LOWER("MANUFACTURER") = $1 AND LOWER("TYPE") = $2 AND LOWER("RANGE") = $3
                  GROUP BY "MANUFACTURER", "TYPE", "RANGE", "MODEL" ORDER BY id;`

        var modelList = await sails.sendNativeQuery(modelQuery, [inputs.manufacturer.toLowerCase(), inputs.type.toLowerCase(), inputs.range.toLowerCase()]);

        const modelArray = modelList.rows.map((obj, index) => ({
          id: index + 1,
          value: obj.MODEL
        }));

        return exits.success({
          modelArray: modelArray
        });
      }

      if (inputs.manufacturer && inputs.type) {
        var rangeQuery = `
                  SELECT "RANGE", MIN(id) AS id
                  FROM "REF_DATA_SWITCH_GEAR"
                  WHERE LOWER("MANUFACTURER") = $1 AND LOWER("TYPE") = $2
                  GROUP BY "MANUFACTURER", "TYPE", "RANGE" ORDER BY id;`

        var rangeList = await sails.sendNativeQuery(rangeQuery, [inputs.manufacturer.toLowerCase(), inputs.type.toLowerCase()]);

        const rangeArray = rangeList.rows.map((obj, index) => ({
          id: index + 1,
          value: obj.RANGE
        }));

        return exits.success({
          rangeArray: rangeArray
        });
      }

      if (inputs.manufacturer) {
        var typeQuery = `
                SELECT "TYPE", MIN(id) AS id FROM "REF_DATA_SWITCH_GEAR" 
                WHERE LOWER("MANUFACTURER") = $1
                GROUP BY "MANUFACTURER", "TYPE" ORDER BY id;`

        var typeList = await sails.sendNativeQuery(typeQuery, [inputs.manufacturer.toLowerCase()]);

        const typeArray = typeList.rows.map((obj, index) => ({
          id: index + 1,
          value: obj.TYPE
        }));

        return exits.success({
          typeArray: typeArray
        });
      }

      var manufacturerQuery = `
              SELECT DISTINCT "MANUFACTURER", MIN(id) AS id  
              FROM "REF_DATA_SWITCH_GEAR" 
              GROUP BY "MANUFACTURER" 
              ORDER BY id;`

      var manufacturerList = await sails.sendNativeQuery(manufacturerQuery);

      const manufacturerArray = manufacturerList.rows.map((obj, index) => ({
        id: index + 1,
        value: obj.MANUFACTURER
      }));

      return exits.success({
        manufacturerArray: manufacturerArray
      });

    } catch (error) {
      sails.log.error(error);

      return this.res.serverError(error);
    }

  }


};
