module.exports = {

  friendlyName: 'Update user',
  description: '',

  inputs: {
    email: {
      type: 'string',
      required: true
    },

    name: {
      type: 'string',
      required: true
    },

    country: {
      type: 'string',
      required: true
    },

    phoneNumber: {
      type: 'string',
      required: true
    },

    organizationName: {
      type: 'string',
      required: true
    },

    website: {
      type: 'string'
    },

    userType: {
      type: 'string'
    },

    userId: {
      type: 'number',
      required: true
    },

    parentId: {
      type: 'number'
    },

    status: {
      type: 'string'
    }
  },

  exits: {

    success: {
      description: 'All done.',
    },
  },


  fn: async function (inputs) {

    var randomPassword = await sails.helpers.service.generateRandomPassword();

    let updatedUser = await User.update({ id: inputs.userId }).set({
      email: inputs.email,
      name: inputs.name,
      password: randomPassword,
      country: inputs.country,
      phoneNumber: inputs.phoneNumber,
      organizationName: inputs.organizationName,
      website: inputs.website,
      userType: inputs.userType,
      status: inputs.status,
      parentId: inputs.parentId
    }).fetch();

    updatedUser[0].password = randomPassword;

    return updatedUser[0];
  }
};