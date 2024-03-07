/**
 * CustomSwitchGear.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'CUSTOM_SWITCH_GEAR',

  attributes: {

    cubicleId: {
      model: 'Cubicle',
      columnName: 'CUBICLE_ID'
    },

    manufacturer: {
      type: 'string',
      columnName: 'MANUFACTURER'
    },

    model: {
      type: 'string',
      columnName: 'MODEL'
    },

    quantity: {
      type: 'number',
      columnName: 'QUANTITY'
    },

    rating: {
      type: 'number',
      columnName: 'RATING'
    },

    unitPowerLoss: {
      type: 'number',
      columnName: 'UNIT_POWER_LOSS'
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

