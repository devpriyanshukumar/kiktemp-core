/**
 * Ref-Data/RefDataSurfaceFactor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'REF_DATA_SURFACE_FACTOR',

  attributes: {

    surfaceFactor: {
      type: 'number',
      columnName: 'SURFACE_FACTOR'
    },

    surfaceId: {
      type: 'number',
      columnName: 'SURFACE_ID'
    },

    installationTypeId: {
      type: 'number',
      columnName: 'INSTALLATION_TYPE_ID'
    },

    cubiclePositionId: {
      type: 'number',
      columnName: 'CUBICLE_POSITION_ID'
    }

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

