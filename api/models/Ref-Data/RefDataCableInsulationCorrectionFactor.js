/**
 * Ref-Data/RefDataInsulationCorrectionFactor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'REF_DATA_CABLE_INSULATION_CORRECTION_FACTOR',

  attributes: {

    cableInsulation: {
      type: 'number',
      columnName: 'CABLE_INSULATION'
    },

    targetTemperature: {
      type: 'number',
      columnName: 'TARGET_TEMPERATURE'
    },

    correctionFactor: {
      type: 'number',
      columnName: 'CORRECTION_FACTOR'
    },

  },

};

