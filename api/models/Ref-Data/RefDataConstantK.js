/**
 * Ref-Data/RefDataConstantK.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'REF_DATA_CONSTANT_K',

  attributes: {

    section: {
      type: 'string',
      isIn: ['A', 'B', 'C'],
      columnName: 'SECTION'
    },

    q0: {
      type: 'number',
      columnName: 'Q0'
    },

    ae: {
      type: 'number',
      columnName: 'AE'
    },

    a: {
      type: 'number',
      columnName: 'A'
    },

    b: {
      type: 'number',
      columnName: 'B'
    },

    c: {
      type: 'number',
      columnName: 'C'
    },

    d: {
      type: 'number',
      columnName: 'D'
    }

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

