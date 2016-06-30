var express = require('express');
var router = express.Router();

router.get('/urlshortener', function(req, res, next) {
  res.render('urlshortener');
});


router.get('/requestheader', function(req, res, next) {
  res.render('requestheader');
});


router.get('/imagesearch', function(req, res, next) {
  res.render('imagesearch');
});


router.get('/timestamp', function(req, res, next) {
  res.render('timestamp');
});

router.get('/upload', function(req, res, next) {
  res.render('upload');
});

module.exports = router;
