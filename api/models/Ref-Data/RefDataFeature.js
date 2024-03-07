/**
 * Ref-Data/RefDataFeature.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'REF_DATA_FEATURE',

  attributes: {

    feature: {
      type: 'string',
      columnName: 'FEATURE'
    },

    routerPath: {
      type: 'string',
      columnName: 'ROUTER_PATH'
    },

    parentFeature: {
      type: 'string',
      columnName: 'PARENT_FEATURE'
    },

    icon: {
      type: 'string',
      columnName: 'ICON'
    },

    userTypes: {
      collection: 'RefDataUserType',
      via: 'features'
    }

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};
