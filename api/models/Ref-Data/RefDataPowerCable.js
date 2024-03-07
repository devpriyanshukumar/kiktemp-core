/**
 * Ref-Data/RefDataPowerCable.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'REF_DATA_POWER_CABLE',

  attributes: {

    cableArrangement: {
      type: 'string',
      isIn: ['In a cable Trunking', 'Touching free in air', 'Spaced in free air'],
      columnName: 'CABLE_ARRANGEMENT'
    },

    crossSectionalArea: {
      type: 'number',
      columnName: 'CROSS_SECTIONAL_AREA'
    },

    operatingCurrent: {
      type: 'number',
      columnName: 'OPERATING_CURRENT'
    },

    powerLoss: {
      type: 'number',
      columnName: 'POWER_LOSS'
    },

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

