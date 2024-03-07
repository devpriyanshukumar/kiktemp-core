/**
 * Cubicle.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'CUBICLE',

  attributes: {

    projectId: {
      model: 'Project',
      columnName: 'PROJECT_ID'
    },

    coolingSystemId: {
      type: 'number',
      columnName: 'COOLING_SYSTEM_ID',
      required: true
    },

    horizontalSeperation: {
      type: 'number',
      columnName: 'HORIZONTAL_SEPERATION',
      required: true
    },

    positionId: {
      type: 'number',
      columnName: 'POSITION_ID',
      required: true
    },

    louverArea: {
      type: 'number',
      columnName: 'LOUVER_AREA',
      required: true
    },

    height: {
      type: 'number',
      columnName: 'HEIGHT',
      required: true
    },

    width: {
      type: 'number',
      columnName: 'WIDTH',
      required: true
    },

    depth: {
      type: 'number',
      columnName: 'DEPTH',
      required: true
    },

    targetTemperature: {
      type: 'number',
      columnName: 'TARGET_TEMPERATURE',
      required: true
    },

    powerLoss: {
      type: 'number',
      columnName: 'POWER_LOSS',
      defaultsTo: 0
    },

    isEditing: {
      type: 'boolean',
      columnName: 'IS_EDITING',
      defaultsTo: true
    },

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

