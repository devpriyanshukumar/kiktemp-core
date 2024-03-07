/**
 * Ref-Data/RefDataMaster.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'REF_DATA_MASTER',

  attributes: {

    category: {
      type: 'string',
      columnName: 'CATEGORY'
    },

    value: {
      type: 'string',
      columnName: 'VALUE'
    },

    index: {
      type: 'string',
      columnName: 'INDEX'
    },

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

