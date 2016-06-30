var express = require('express');
var http = require("http");
var url = require("url");
var request = require('request');
var router = express.Router();
var recent = [];

//最近历史
router.get('/recent', function(req, res){
  if(recent.length > 20){
    recent = recent.slice(10);
  }
  res.end(JSON.stringify(recent));
});

//查询
router.get('/s/:key/:num', function(req,res) {
   var key = req.params.key,
        num = req.params.num;
    recent.push({
      "key" : key,
      "num" : num,
      'ip': req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      'agent': req.headers['user-agent'],
      'language': req.headers["accept-language"],
    });
    writeData(key, num, res);
});

function writeData(key, num, res){
  strUrl = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + key + "&count=" + num + "&offset=0&mkt=en-us&safeSearch=Moderate";
  var parse = url.parse(strUrl);

  var options = {
    url: strUrl,
    headers: {
      "Content-Type": 'application/json',
          "Ocp-Apim-Subscription-Key" : "15137017423443c2b0d016b920f20761"
    }
  };
  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          res.end(JSON.stringify(info.value));
      }else{
        res.end("error", "unknow");
      }
  }
  request(options, callback);
}

module.exports = router;
