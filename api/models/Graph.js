/**
 * Graph.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'GRAPH',

  attributes: {

    projectId: {
      model: 'Project',
      columnName: 'PROJECT_ID'
    },

    cubicleId: {
      model: 'Cubicle',
      columnName: 'CUBICLE_ID'
    },

    temp0: {
      type: 'number',
      columnName: 'TEMP_0'
    },

    temp25: {
      type: 'number',
      columnName: 'TEMP_25'
    },

    temp50: {
      type: 'number',
      columnName: 'TEMP_50'
    },

    temp75: {
      type: 'number',
      columnName: 'TEMP_75'
    },

    temp1: {
      type: 'number',
      columnName: 'TEMP_1'
    },

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

