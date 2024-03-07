const axios = require('axios');
const fs = require('fs');
const handlebars = require('handlebars');

module.exports = {


  friendlyName: 'Send mail',


  description: '',


  inputs: {

    emailOptions: {
      type: 'ref',
      required: true,
      description: 'Options include to, subject, template, and other details'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {

    const tokenEndpoint = 'https://login.microsoftonline.com/93701fb5-b4f0-46ea-aa1c-cebdf93c13d1/oauth2/v2.0/token';

    // Create an object with form data to access token api call
    const formData = new URLSearchParams();
    formData.append('client_id', sails.config.custom.clientId);
    formData.append('scope', sails.config.custom.scope);
    formData.append('client_secret', sails.config.custom.clientSecret);
    formData.append('grant_type', 'client_credentials');

    // Render email template
    const emailTemplatePath = './views/' + inputs.emailOptions.template + '.hbs';

    // Load the Handlebars template from the file
    const templateSource = fs.readFileSync(emailTemplatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    const renderedTemplate = template(inputs.emailOptions.context);

    // get the access token
    const accessToken = await axios.post(tokenEndpoint, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });

    // Email From
    const emailEndpoint = 'https://graph.microsoft.com/v1.0/users/info@kikblox.com/sendMail';

    const emailData = {
      message: {
        subject: inputs.emailOptions.subject,
        body: {
          contentType: 'HTML',
          content: renderedTemplate, // Include the rendered template
        },
        toRecipients: [
          {
            emailAddress: {
              address: inputs.emailOptions.mailTo, // Replace with the recipient's email address.
            },
          },
        ],
      },
    };

    try {
      // send the email
      await axios.post(emailEndpoint, emailData, {
        headers: {
          Authorization: `Bearer ${accessToken.data.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      return exits.success({
        message: 'Email sent successfully'
      });

    } catch (error) {
      sails.log(error);
    }
  }


};

