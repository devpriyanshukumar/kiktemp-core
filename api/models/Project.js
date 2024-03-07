/**
 * Projects.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'PROJECT',

  attributes: {

    userId: {
      model: 'User',
      columnName: 'USER_ID',
      required: true
    },

    projectName: {
      type: 'string',
      columnName: 'PROJECT_NAME',
      required: true
    },

    elevation: {
      type: 'number',
      columnName: 'ELEVATION',
      required: true
    },

    demandFactor: {
      type: 'number',
      columnName: 'DEMAND_FACTOR',
      required: true
    },

    ambientTem: {
      type: 'number',
      columnName: 'AMBIENT_TEMP',
      required: true
    },

    projectNo: {
      type: 'string',
      columnName: 'PROJECT_NO'
    },

    installationTypeId: {
      type: 'number',
      columnName: 'INSTALLATION_TYPE_ID',
      required: true
    },

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

