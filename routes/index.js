var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home page' });
});

router.get('/createzone', function(req, res, next) {
  res.render('createzone', null);
});
router.get('/createcomment', function(req, res, next) {
  res.render('createcomment', null);
});
router.get('/movies',function(req,res,next){
  var metaObj = {
    title:'movies'
  }
  res.render('movies',metaObj);
});
module.exports = router;
