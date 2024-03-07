/**
 * Ref-Data/RefDataConstantD.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'REF_DATA_CONSTANT_D',

  attributes: {

    section: {
      type: 'string',
      isIn: ['A', 'B', 'C'],
      columnName: 'SECTION'
    },

    horizontalPartitionCount: {
      type: 'number',
      columnName: 'HORIZONTAL_PARTITION_COUNT'
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

