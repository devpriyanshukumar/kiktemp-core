/**
 * Development environment settings
 * (sails.config.*)
 *
 * What you see below is a quick outline of the built-in settings you need
 * to configure your Sails app for development.  The configuration in this file
 * is only used in your development environment, i.e. when you lift your app using:
 *
 * ```
 * NODE_ENV=development node app
 * ```
 *
 * > If you're using git as a version control solution for your Sails app,
 * > this file WILL BE COMMITTED to your repository by default, unless you add
 * > it to your .gitignore file.  If your repository will be publicly viewable,
 * > don't add private/sensitive data (like API secrets / db passwords) to this file!
 *
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

module.exports = {
  jwtSecret: 'The wild fox jumped over the jampson tree and swallowed the raspberries',
  datastores: {
    default: {
      adapter: 'sails-postgresql',
      url: 'postgresql://doadmin:AVNS_7hN5j4W-S6bMvsd9ycL@kiktemp-db-do-user-12537770-0.b.db.ondigitalocean.com:25060/defaultdb?sslmode=require',
      schemaName: 'public',
      ssl: {
        ca: require('fs').readFileSync('../ssl/db/ca-certificate.crt'),
      },

    },

  },



  models: {

    migrate: 'safe',

  },

  blueprints: {
    shortcuts: false,
  },

  security: {

    cors: {
      // allowOrigins: [
      //   'https://example.com',
      // ]
    },

  },

  session: {

    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },

  },

  sockets: {


  },

  log: {
    level: 'debug'
  },



  http: {

    cache: 365.25 * 24 * 60 * 60 * 1000, // One year


  },

  custom: {
    siteUrl: 'http://localhost:4200',
    baseUrl: 'http://localhost:1337/',
    adminMail: 'info@KIKBLOX.com',

    // Azure Portal
    clientId: 'd5746f9f-f1c2-4616-a7e8-e10f3bb29ae7',
    clientSecret: '5gw8Q~7~yGrGwydYY53gF4Px.WpjwosXfFYtFb7d',
    scope: 'https://graph.microsoft.com/.default',

  },



};
