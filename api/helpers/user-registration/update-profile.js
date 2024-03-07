module.exports = {

    friendlyName: 'Update user',
    description: '',
  
    inputs: {
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
  
      userId: {
        type: 'number',
        required: true
      }
    },
  
    exits: {
  
      success: {
        description: 'All done.',
      },
    },
  
  
    fn: async function (inputs) {
  
      let updatedUser = await User.update({ id: inputs.userId }).set({
        name: inputs.name,
        country: inputs.country,
        phoneNumber: inputs.phoneNumber,
        organizationName: inputs.organizationName,
        website: inputs.website
      }).fetch();
  
      return updatedUser[0];
    }
  };