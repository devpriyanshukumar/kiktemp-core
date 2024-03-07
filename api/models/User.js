/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'USER',

  attributes: {

    email: {
      type: 'string',
      columnName: 'EMAIL',
      required: true,
      unique: true
    },

    name: {
      type: 'string',
      columnName: 'NAME',
      required: true
    },

    password: {
      type: 'string',
      columnName: 'PASSWORD'
    },

    userType: {
      type: 'string',
      columnName: 'USER_TYPE',
      isIn: ['directCustomer', 'customer', 'distributor', 'admin'],
      defaultsTo: 'directCustomer'
    },

    status: {
      type: 'string',
      isIn: ['verified', 'suspended', 'removed', 'requested'],
      defaultsTo: 'requested',
      columnName: 'STATUS'
    },

    country: {
      type: 'string',
      columnName: 'COUNTRY',
      required: true
    },

    phoneNumber: {
      type: 'string',
      columnName: 'PHONE_NUMBER',
      required: true
    },

    organizationName: {
      type: 'string',
      columnName: 'ORGANIZATION_NAME',
      required: true
    },

    website: {
      type: 'string',
      columnName: 'WEBSITE'
    },

    parentId: {
      type: 'number',
      columnName: 'PARENT_ID'
    },

    resetPasswordEmailProofToken: {
      type: 'string',
      columnName: 'RESET_PASSWORD_EMAIL_PROOF_TOKEN'
    },

    resetPasswordEmailProofTokenExpiration: {
      type: 'number',
      columnName: 'RESET_PASSWORD_EMAIL_PROOF_TOKEN_EXPIRATION'
    },

  },

  customToJSON: function () {
    return _.omit(this, ['createdAt', 'updatedAt', 'password']);
  },

  // LIFE CYCLE
  beforeCreate: async function (values, proceed) {
    if (values.password) {
      const hashedPassword = await sails.helpers.passwords.hashPassword(
        values.password
      );

      values.password = hashedPassword;

      return proceed();
    } else {
      return proceed();
    }
  },

  beforeUpdate: async function (values, proceed) {
    if (values.password) {
      const hashedPassword = await sails.helpers.passwords.hashPassword(
        values.password
      );

      values.password = hashedPassword;

      return proceed();
    } else {
      return proceed();
    }
  },

};

