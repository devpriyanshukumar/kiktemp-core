/**
 * Ref-Data/RefDataBusBar.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'REF_DATA_BUS_BAR',

  attributes: {

    busBarType: {
      type: 'string',
      isIn: ['oneBar', 'twoBars'],
      columnName: 'BUS_BAR_TYPE'
    },

    heightAndThickness: {
      type: 'string',
      columnName: 'HEIGHT_AND_THICKNESS'
    },

    operatingCurrent: {
      type: 'number',
      columnName: 'OPERATING_CURRENT'
    },

    powerLoss: {
      type: 'number',
      columnName: 'POWER_LOSS'
    },

    k3: {
      type: 'number',
      columnName: 'K3'
    },

    crossSectionArea: {
      type: 'number',
      columnName: 'CROSS_SECTION_AREA'
    },

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

