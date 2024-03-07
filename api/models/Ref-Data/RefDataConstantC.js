/**
 * Ref-Data/RefDataConstantC.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'REF_DATA_CONSTANT_C',

  attributes: {

    section: {
      type: 'string',
      isIn: ['A', 'B', 'C'],
      columnName: 'SECTION'
    },

    f: {
      type: 'number',
      columnName: 'F'
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
    },

    installationTypeId: {
      type: 'number',
      columnName: 'INSTALLATION_TYPE_ID'
    },

    cubiclePositionId: {
      type: 'number',
      columnName: 'CUBICLE_POSITION_ID'
    },

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

