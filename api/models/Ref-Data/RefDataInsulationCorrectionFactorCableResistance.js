/**
 * Ref-Data/RefDataInsulationCorrectionFactor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'REF_DATA_CABLE_RESISTANCE',
  
    attributes: {
  
        crossSectionalArea: {
          type: 'number',
          columnName: 'CROSS_SECTIONAL_AREA'
        },
  
        resistance: {
          type: 'number',
          columnName: 'RESISTANCE'
        },
  
    },
  
  };
  
  