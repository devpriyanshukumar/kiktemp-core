/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  // Error codes and messages
  uniqueError: 'E_UNIQUE',
  invalidParamsError: 'E_MISSING_OR_INVALID_PARAMS',
  incorrect: 'incorrect',

  // numbers
  tableRowsPerPage: 10,
  emailProofTokenTTL: 48 * 60 * 60 * 1000, // 48 hours
  limitedTableRowsPerPage: 9,

  // userStatus
  suspended: 'suspended',
  removed: 'removed',
  requested: 'requested',
  verified: 'verified',
  unsuspended: 'unsuspended',

  // userTypes
  admin: 'admin',
  distributor: 'distributor'

};
