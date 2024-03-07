module.exports = {


  friendlyName: 'Database get matching routes',


  description: '',


  inputs: {
    userType: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {

    var matchedRouteQuery = `SELECT pivotTable."refdatafeature_userTypes" "FEATURE_ID", featureTable."FEATURE", featureTable."ROUTER_PATH", featureTable."PARENT_FEATURE", featureTable."ICON",
    pivotTable."refdatausertype_features" "USER_TYPE_ID", userTypeTable."USER_TYPE", userTypeTable."USER_TYPE_STRING"
      FROM "refdatafeature_userTypes__refdatausertype_features" pivotTable
      INNER JOIN "REF_DATA_FEATURE" featureTable
      ON pivotTable."refdatafeature_userTypes" = featureTable.id
      INNER JOIN "REF_DATA_USER_TYPE" userTypeTable
      ON pivotTable."refdatausertype_features" = userTypeTable.id
      WHERE "USER_TYPE" = $1`;

      var matchedRoutes = await sails.sendNativeQuery(matchedRouteQuery, [inputs.userType]);

      return matchedRoutes.rows;
  }
};