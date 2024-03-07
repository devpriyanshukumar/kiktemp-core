/**
 * CustomersOfDistributor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'CUSTOMERS_OF_DISTRIBUTOR',

  attributes: {

    distributorUserId: {
      model: 'User',
      columnName: 'DISTRIBUTOR_USER_ID'
    },

    customerUserId: {
      model: 'User',
      columnName: 'CUSTOMER_USER_ID',
      unique: true
    },

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt']);
  },

};

