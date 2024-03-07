/**
 * Ref-Data/RefDataConstantX.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'REF_DATA_CONSTANT_X',

  attributes: {

    section: {
      type: 'string',
      isIn: ['A', 'B', 'C'],
      columnName: 'SECTION'
    },

    x: {
      type: 'number',
      columnName: 'X'
    },

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

