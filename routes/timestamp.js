var express = require('express');
var moment = require('moment');
var router = express.Router();

router.get('/:timestamp', function(req,res) {
   var d,
        path = req.params.timestamp;
    if(/^\d{8,}$/.test(path)) {
        d = moment(path, "X");
    } else {
        d = moment(path, "MMMM D, YYYY");
    }
    if(d.isValid()) {
        var result = {
          unix: d.format("X"),
          natural: d.format("MMMM D, YYYY")
        };
        res.end(JSON.stringify(result));
    } else {
        var result = {
          unix: "",
          natural: ""
        };
        res.end(JSON.stringify(result));
    }
});

module.exports = router;
