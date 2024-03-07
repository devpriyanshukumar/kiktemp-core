
var jwt = require('jsonwebtoken');
const secret = sails.config.jwtSecret || process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  if (req.header('authorization')) {
    // if one exists, attempt to get the header data
    var token = req.header('authorization').split('Bearer ')[1];

    // if there's nothing after "Bearer", no go
    if (!token && req.wantsJSON) {
      sails.log.debug('Bearer token was not found on the request');
      return res.sendStatus(401);
    }

    // if there is something, attempt to parse it as a JWT token
    return jwt.verify(token, secret, async (err, payload) => {
      if (err && req.wantsJSON) {
        res.status(403);
        return res.json(err);
      }
      if (!payload.sub) {
        sails.log.debug('Payload subject missing');
        if (req.wantsJSON) {
          return res.sendStatus(401);
        }
      }

      var user = await User.findOne({ id: payload.sub });

      if (!user) {
        sails.log.debug('Subject id not found in the holder');
        if (req.wantsJSON) {
          return res.sendStatus(401);
        }
      }
      // if it got this far, everything checks out, success
      req.user = user;
      return next();
    });
  }

  sails.log.debug('Authorization not set');
  if (req.wantsJSON) {
    return res.sendStatus(401);
  }

};
