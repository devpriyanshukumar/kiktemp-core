module.exports = {


  friendlyName: 'Arrange email options',


  description: '',


  inputs: {
    mailTo: {
      type: 'string',
      required: true
    },

    subject: {
      type: 'string',
      required: true
    },

    template: {
      type: 'string',
      required: true
    },

    emailData: {
      type: 'ref'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const emailOptions = {
      mailTo: inputs.mailTo,
      subject: inputs.subject,
      template: inputs.template,
      context: inputs.emailData
    };

    return emailOptions;


  }
};
