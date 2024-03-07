/**
 * BusBar.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'BUS_BAR',

  attributes: {

    cubicleId: {
      model: 'Cubicle',
      columnName: 'CUBICLE_ID'
    },

    description: {
      type: 'string',
      columnName: 'DESCRIPTION'
    },

    busBarType: {
      type: 'string',
      columnName: 'BUS_BAR_TYPE'
    },

    heightAndThickness: {
      type: 'string',
      columnName: 'HEIGHT_AND_THICKNESS'
    },

    inputCurrent: {
      type: 'number',
      columnName: 'INPUT_CURRENT'
    },

    busBarlength: {
      type: 'number',
      columnName: 'BUS_BAR_LENGTH'
    },

    powerLoss: {
      type: 'number',
      columnName: 'POWER_LOSS'
    },

    maxCurrent: {
      type: 'number',
      columnName: 'MAX_CURRENT'
    },

    maxPowerLoss: {
      type: 'number',
      columnName: 'MAX_POWER_LOSS'
    },

    conductorTemperature: {
      type: 'number',
      columnName: 'CONDUCTOR_TEMPERATURE'
    }

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

