var express = require('express');
var check_auth = require('./middleware/auth').check_auth;
var signUp = require('./controllers/sign').signUp;
var signIn = require('./controllers/sign').signIn;
var layout = require('./controllers/sign').layout;
var newTag = require('./controllers/essay').new_tag;
var getTag = require('./controllers/essay').get_tag;
var getEssayTag = require('./controllers/essay').get_essay_tag;
var newEssay = require('./controllers/essay').new_essay;
var getEssayTag = require('./controllers/essay').get_essay_tag;
var modifyTag = require('./controllers/essay').modify_tag;
var deleteTag = require('./controllers/essay').delete_tag;
var deleteEssay = require('./controllers/essay').delete_essay;
var uploadFile = require('./controllers/file').upload_file;
var save_essay = require('./controllers/essay').save_essay;
var get_the_essay = require('./controllers/essay').get_the_essay;
var set_essay_tag = require('./controllers/essay').set_essay_tag;
var publish = require('./controllers/essay').publish;
var get_publish_essay = require('./controllers/essay').get_publish_essay;

var multipart = require('connect-multiparty');

var router = express.Router();

var multipartMiddleware = multipart();

//管理员
router.post('/admin/login');
router.get('/get/userlist', function(req, res, next){
    res.status(200);
    res.send('hello admin');
});
router.get('/lock/user');

//用户
router.post('/user/login', signIn);
router.post('/user/register', signUp);
router.post('/file/upload', check_auth, multipartMiddleware, uploadFile);

//注销
router.get('/layout', check_auth, layout);

//文章
router.get('/essay/newtag', check_auth, newTag);
router.get('/essay/tag', check_auth, getTag);
router.get('/essay/essaytag', check_auth, getEssayTag);
router.get('/essay/modifytag', check_auth, modifyTag);
router.get('/essay/deletetag', check_auth, deleteTag);
router.get('/essay/delete', check_auth, deleteEssay);
router.get('/essay/getpublish', get_publish_essay);
router.get('/essay/getmarkdown', get_the_essay);
router.post('/essay/gethtml');
router.post('/essay/new', check_auth, newEssay);
router.get('/essay/draft');
router.post('/essay/save', check_auth, save_essay);
router.get('/essay/publish', check_auth, publish);
router.get('/essay/getcollection');
router.get('/essay/settag', check_auth, set_essay_tag);

module.exports=router;