/**
 * Ref-Data/RefDataSwitchGear.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'REF_DATA_SWITCH_GEAR',

  attributes: {

    maufacturer: {
      type: 'string',
      columnName: 'MANUFACTURER'
    },

    type: {
      type: 'string',
      columnName: 'TYPE'
    },

    range: {
      type: 'string',
      columnName: 'RANGE'
    },

    model: {
      type: 'string',
      columnName: 'MODEL'
    },

    ratedCurrent: {
      type: 'number',
      columnName: 'RATED_CURRENT'
    },

    ratedPowerLoss: {
      type: 'number',
      columnName: 'RATED_POWER_LOSS'
    },

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

