/**
 * SwitchGear.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'SWITCH_GEAR',

  attributes: {

    cubicleId: {
      model: 'Cubicle',
      columnName: 'CUBICLE_ID'
    },

    refSwitchGearId: {
      type: 'number',
      columnName: 'REF_SWITCHGEAR_ID'
    },

    quantity: {
      type: 'number',
      columnName: 'QUANTITY'
    },

    powerLoss: {
      type: 'number',
      columnName: 'POWER_LOSS'
    },

    operatingCurrent: {
      type: 'number',
      columnName: 'OPERATING_CURRENT'
    }

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

