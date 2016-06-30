var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
     var info = {
         'ip': req.headers['x-forwarded-for'] || req.socket.remoteAddress,
          'agent': req.headers['user-agent'],
         'language': req.headers["accept-language"],
     };
     res.json(info);
});

module.exports = router;
