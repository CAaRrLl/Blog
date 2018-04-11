
var express = require('express');
var check_auth = require('./middleware/auth').check_auth;
var signUp = require('./controllers/sign').signUp;
var signIn = require('./controllers/sign').signIn;
var layout = require('./controllers/sign').layout;
var router = express.Router();

//管理员
router.post('/admin/login');
router.get('/get/userlist', function(req, res, next){
    res.status(200);
    res.send('hello admin');
});
router.get('/lock/user');

//用户
router.post('/user/login', signIn);
router.post('/user/register', check_auth, signUp);

//注销
router.get('/layout', check_auth, layout);

//文章
router.get('/essay/getpublish');
router.get('/essay/getmarkdown');
router.post('/essay/gethtml');
router.post('/essay/new');
router.get('/essay/draft');
router.post('/essay/save');
router.get('/essay/mypublish');
router.get('/essay/getcollection');

module.exports=router;