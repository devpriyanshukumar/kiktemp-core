/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*': true, // By default, allow access to all actions

  'admin': {
    'get-all-signup-requests': 'is-logged-in',
    'get-signup-request-data-by-user-id': 'is-logged-in',
    'manage-signup-request-data-by-user-id': 'is-logged-in',
  },

  'ref-data': {
    'get-matched-routes': 'is-logged-in',
    'get-ref-data': 'is-logged-in',
    'get-bus-bar-cross-section-list': 'is-logged-in',
    'get-switch-gear-data': 'is-logged-in',
    'get-current-carrying-capacity-data': 'is-logged-in',
  },

  'project/bus-bar': {
    'create-cubicle-bus-bar': 'is-logged-in',
    'edit-cubicle-bus-bar': 'is-logged-in',
    'get-cubicle-bus-bars': 'is-logged-in',
    'delete-cubicle-bus-bar': 'is-logged-in',
  },

  'project/switchgear': {
    'create-cubicle-switchgear': 'is-logged-in',
    'edit-cubicle-switchgear': 'is-logged-in',
    'get-cubicle-switchgears': 'is-logged-in',
    'delete-cubicle-switchgear': 'is-logged-in',
  },

  'project/custom-switchgear': {
    'create-cubicle-custom-switchgear': 'is-logged-in',
    'edit-cubicle-custom-switchgear': 'is-logged-in',
    'get-cubicle-custom-switchgears': 'is-logged-in',
    'delete-cubicle-custom-switchgear': 'is-logged-in',
  },

  'project/power-cable': {
    'create-cubicle-power-cable': 'is-logged-in',
    'edit-cubicle-power-cable': 'is-logged-in',
    'get-cubicle-power-cables': 'is-logged-in',
    'delete-cubicle-power-cable': 'is-logged-in',
    'calculate-maximum-current': 'is-logged-in',
  },

  'project/cubicle': {
    'create-cubicle': 'is-logged-in',
    'edit-cubicle': 'is-logged-in',
    'get-cubicle-data': 'is-logged-in',
    'delete-cubicle': 'is-logged-in',
    'calculate-temp-rise': 'is-logged-in',
  },

  'user-management': {
    'suspend-remove-user': 'is-logged-in',
    'user-search': 'is-logged-in',
    'get-user-detail': 'is-logged-in',
  },

  'project': {
    'get-project-details': 'is-logged-in',
    'remove-project': 'is-logged-in',
  },

  'project-management': {
    'create-new-project': 'is-logged-in',
    'get-project-detail': 'is-logged-in',
    'get-project-id': 'is-logged-in',
    'search-project': 'is-logged-in',
    'update-project': 'is-logged-in',
  },

  'user': {
    'get-user-by-user-id': 'is-logged-in',
    'manage-user-profile-change-password': 'is-logged-in',
    'manage-user-profile-confirm-password': 'is-logged-in',
    'manage-user-profile-get-user-data': 'is-logged-in',
    'manage-user-profile-update-profile': 'is-logged-in',
  },
};