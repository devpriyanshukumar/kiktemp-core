/**
 * Ref-Data/RefDataCableCurrentCarryingCapacity.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'REF_DATA_CABLE_CURRENT_CARRYING_CAPACITY',

  attributes: {

    conductorTemperature: {
      type: 'number',
      columnName: 'CONDUCTOR_TEMPERATURE'
    },

    cableArrangement: {
      type: 'number',
      columnName: 'CABLE_ARRANGEMENT'
    },

    cableInstallationType: {
      type: 'number',
      columnName: 'CABLE_INSTALLATION_TYPE'
    },

    cableInstallationMethod: {
      type: 'number',
      columnName: 'CABLE_INSTALLATION_METHOD'
    },

    crossSectionalArea: {
      type: 'number',
      columnName: 'CROSS_SECTIONAL_AREA'
    },

    currentCarryingCapacity: {
      type: 'number',
      columnName: 'CURRENT_CARRYING_CAPACITY'
    }

  },

};

