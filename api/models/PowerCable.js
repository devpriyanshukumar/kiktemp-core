/**
 * PowerCable.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'POWER_CABLE',

  attributes: {

    cubicleId: {
      model: 'Cubicle',
      columnName: 'CUBICLE_ID'
    },

    description: {
      type: 'string',
      columnName: 'DESCRIPTION'
    },

    conductorTemperature: {
      type: 'number',
      columnName: 'CONDUCTOR_TEMPERATURE'
    },

    maximumCurrent: {
      type: 'number',
      columnName: 'MAXIMUM_CURRENT'
    },

    currentCarryingCapacityId: {
      type: 'number',
      columnName: 'CURRENT_CARRYING_CAPACITY_ID'
    },

    insulationCorrectionFactorId: {
      type: 'number',
      columnName: 'INSULATION_CORRECTION_FACTOR_ID'
    },

    inputCurrent: {
      type: 'number',
      columnName: 'INPUT_CURRENT'
    },

    cableLength: {
      type: 'number',
      columnName: 'CABLE_LENGTH'
    },

    maximumPowerLoss: {
      type: 'number',
      columnName: 'MAXIMUM_POWER_LOSS'
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

