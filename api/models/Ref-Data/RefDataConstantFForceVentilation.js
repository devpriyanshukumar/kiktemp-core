/**
 * Ref-Data/RefDataConstantF.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'REF_DATA_CONSTANT_F_FORCE_VENTILATION',

  attributes: {

    elevation: {
      type: 'number',
      columnName: 'ELEVATION'
    },

    f: {
      type: 'number',
      columnName: 'F'
    },

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

