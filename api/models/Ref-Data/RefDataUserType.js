/**
 * Ref-Data/RefDataUserType.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'REF_DATA_USER_TYPE',

  attributes: {

    userType: {
      type: 'string',
      columnName: 'USER_TYPE'
    },

    userTypeString: {
      type: 'string',
      columnName: 'USER_TYPE_STRING'
    },

    features: {
      collection: 'RefDataFeature',
      via: 'userTypes',
    }

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

