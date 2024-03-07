/**
 * Ref-Data/RefDataCountry.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'REF_DATA_COUNTRY',

  attributes: {

    country: {
      type: 'string',
      columnName: 'COUNTRY'
    },

    countryCode: {
      type: 'string',
      columnName: 'COUNTRY_CODE'
    },

    phoneNumberCount: {
      type: 'string',
      columnName: 'PHONE_NUMBER_COUNT'
    }

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  }

};

