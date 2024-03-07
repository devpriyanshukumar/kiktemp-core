const jwt = require('jsonwebtoken');
const secret = sails.config.jwtSecret;

module.exports = {


  friendlyName: 'Generate new jwt token',


  description: '',


  inputs: {
    subject: {
      type: 'string',
      required: true
    },

    role: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const payload = {
      sub: inputs.subject, // Subject
      role: inputs.role,  // User type
      iss: 'KIK Lanka PVT Ltd' // Issuer
    };
    const token = jwt.sign(payload, secret, { expiresIn: '1d' });
    return token;
  }


};

