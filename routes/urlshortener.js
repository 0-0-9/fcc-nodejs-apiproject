var express = require('express');
var router = express.Router();

var urlCache = [];

router.get('/n/*', function(req, res, next) {
    var url = req.url.slice(3);
    if(!validateURL()){
        res.json({
            "error": "url is illegal" + url
        });
        return;
    }
    var length = urlCache.length;
     for (var i = length - 1; i >= 0; i--) {
         var tmp = urlCache[i];
         console.info("urlCache[i] : " + JSON.stringify(tmp) + " url : " + url + " tmp.origin "  + tmp.origin);
         if(tmp.origin == url){
             res.json({
                "origin" : url,
                "short"  : process.env.APP_URL + "urlshortener/s/" +  tmp.id
             });
             return;
         }
     }
     urlCache.push({
        "id" : length + 1,
        "origin" : url
     })
    res.json({
        "origin" : url,
        "short"  : process.env.APP_URL + "urlshortener/s/" + (length + 1)
    });
});

router.get('/s/:id', function(req, res, next){
    var id = req.params.id;
    var length = urlCache.length;
    for (var i = length - 1; i >= 0; i--) {
         var tmp = urlCache[i];
         if(tmp.id == id){
            res.redirect(tmp.origin);
            return;
         }
     }
     res.json({
        "error" : id + " not found"
     });
});

function validateURL(url){
       var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
       + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
       + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
       + "|" // 允许IP和DOMAIN（域名）
       + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
       + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
       + "[a-z]{2,6})" // first level domain- .com or .museum
       + "(:[0-9]{1,4})?" // 端口- :80
       + "((/?)|" // a slash isn't required if there is no file name
       + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
       var re = new RegExp(strRegex);
       if (re.test(url)){
           return (true);
       }else{
           return (false);
       }
   }

module.exports = router;
