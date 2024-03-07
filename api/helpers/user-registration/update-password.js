module.exports = {

    friendlyName: 'Update Password',
    description: '',
  
    inputs: {
  
      userId: {
        type: 'number',
        required: true
      },
  
      password: {
        type: 'string'
      }
    },
  
    exits: {
  
      success: {
        description: 'All done.',
      },
    },
  
  
    fn: async function (inputs) {
  
      let updatedUser = await User.updateOne({ id: inputs.userId }).set({
        password: inputs.password
      });
      
      return updatedUser;
    }
  };