/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  // Home
  'POST /api/login': 'home/login',
  'POST /api/signup-request': 'home/signup-request',
  'POST /api/forgot-password': 'home/forgot-password',
  'POST /api/reset-password': 'home/reset-password',

  // Admin
  'GET /api/get-all-signup-requests': 'admin/get-all-signup-requests',
  'GET /api/get-signup-request-data-by-user-id': 'admin/get-signup-request-data-by-user-id',
  'POST /api/signup-user': 'admin/manage-signup-request-data-by-user-id',

  //User
  'POST /api/confirm-current-password-async': 'user/manage-user-profile-confirm-password',
  'POST /api/update-password-async': 'user/manage-user-profile-change-password',
  'POST /api/update-profile-async': 'user/manage-user-profile-update-profile',
  'GET /api/manage-user-profile-get-user-data-async': 'user/manage-user-profile-get-user-data',
  'GET /api/get-user-by-user-id': 'user/get-user-by-user-id',

  // Reference Data
  'GET /api/get-matched-routes': 'ref-data/get-matched-routes',
  'GET /api/get-ref-data': 'ref-data/get-ref-data',
  'GET /api/get-bus-bar-cross-section-list': 'ref-data/get-bus-bar-cross-section-list',
  'GET /api/get-switch-gear-data': 'ref-data/get-switch-gear-data',
  'GET /api/get-current-carrying-capacity-data': 'ref-data/get-current-carrying-capacity-data',
  'GET /api/get-country-details': 'ref-data/get-country-details',

  // Project - Bus Bar
  'POST /api/create-cubicle-bus-bar' : 'project/bus-bar/create-cubicle-bus-bar',
  'PUT /api/edit-cubicle-bus-bar' : 'project/bus-bar/edit-cubicle-bus-bar',
  'GET /api/get-cubicle-bus-bars': 'project/bus-bar/get-cubicle-bus-bars',
  'DELETE /api/delete-cubicle-bus-bar': 'project/bus-bar/delete-cubicle-bus-bar',
  'GET /api/get-project-details': 'project/get-project-details',
  'POST /api/remove-project': 'project/remove-project',
  
  // Project - Switchgear
  'POST /api/create-cubicle-switchgear': 'project/switchgear/create-cubicle-switchgear',
  'PUT /api/edit-cubicle-switchgear': 'project/switchgear/edit-cubicle-switchgear',
  'GET /api/get-cubicle-switchgears': 'project/switchgear/get-cubicle-switchgears',
  'DELETE /api/delete-cubicle-switchgear': 'project/switchgear/delete-cubicle-switchgear',
  
  // Project - Custom Switchgear
  'POST /api/create-cubicle-custom-switchgear': 'project/custom-switchgear/create-cubicle-custom-switchgear',
  'PUT /api/edit-cubicle-custom-switchgear': 'project/custom-switchgear/edit-cubicle-custom-switchgear',
  'GET /api/get-cubicle-custom-switchgears': 'project/custom-switchgear/get-cubicle-custom-switchgears',
  'DELETE /api/delete-cubicle-custom-switchgear': 'project/custom-switchgear/delete-cubicle-custom-switchgear',
  
  // Project - Cable
  'POST /api/create-cubicle-power-cable': 'project/power-cable/create-cubicle-power-cable',
  'PUT /api/edit-cubicle-power-cable': 'project/power-cable/edit-cubicle-power-cable',
  'GET /api/get-cubicle-power-cables': 'project/power-cable/get-cubicle-power-cables',
  'DELETE /api/delete-cubicle-power-cable': 'project/power-cable/delete-cubicle-power-cable',
  'POST /api/calculate-maximum-current': 'project/power-cable/calculate-maximum-current',

  // Project - Cubicle
  'POST /api/create-cubicle': 'project/cubicle/create-cubicle',
  'PUT /api/edit-cubicle': 'project/cubicle/edit-cubicle',
  'GET /api/get-cubicle-data': 'project/cubicle/get-cubicle-data',
  'DELETE /api/delete-cubicle': 'project/cubicle/delete-cubicle',
  'POST /api/calculate-temp-rise': 'project/cubicle/calculate-temp-rise',
  
  //User Management
  'POST /api/suspend-remove-user': 'user-management/suspend-remove-user',
  'POST /api/user-search': 'user-management/user-search',
  'GET /api/get-user-detail': 'user-management/get-user-detail',

  //ProjectManagement
  'GET /api/get-project-id-async': 'project-management/get-project-id',
  'GET /api/get-project-data-by-project-id-async': 'project-management/get-project-detail',
  'POST /api/create-new-project-async': 'project-management/create-new-project',
  'POST /api/update-project-data-by-project-id-async': 'project-management/update-project',
  'GET /api/search-project': 'project-management/search-project',

};

