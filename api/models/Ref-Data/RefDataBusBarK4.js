/**
 * Ref-Data/RefDataBusBarK4.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'REF_DATA_BUS_BAR_K4',

  attributes: {

    targetTemperature: {
      type: 'number',
      columnName: 'TARGET_TEMPERATURE'
    },

    conductorTemperature: {
      type: 'number',
      columnName: 'CONDUCTOR_TEMPERATURE'
    },

    k4: {
      type: 'number',
      columnName: 'K4'
    }

  },

};

