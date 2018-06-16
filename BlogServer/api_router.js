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
var getPublishEssay = require('./controllers/essay').get_publish_essay;
var getInfo = require('./controllers/user').get_info;
var getDataSum = require('./controllers/user').get_data_sum;
var saveInfo = require('./controllers/user').save_info;
var essay_publish_auth = require('./middleware/auth').essay_publish_auth;
var get_comments = require('./controllers/comment').get_comments;
var add_comment = require('./controllers/comment').add_comment;
var add_reply = require('./controllers/comment').add_reply;
var del_comment = require('./controllers/comment').del_comment;
var del_reply = require('./controllers/comment').del_reply;
var addEssayReadTime = require('./controllers/essay').add_read_time;

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
router.post('/user/info/save', check_auth, saveInfo)
router.get('/user/info', check_auth, getInfo);
router.get('/user/datasum', check_auth, getDataSum);

//注销
router.get('/layout', check_auth, layout);

//文章
router.get('/essay/newtag', check_auth, newTag);
router.get('/essay/tag', check_auth, getTag);
router.get('/essay/essaytag', check_auth, getEssayTag);
router.get('/essay/modifytag', check_auth, modifyTag);
router.get('/essay/deletetag', check_auth, deleteTag);
router.get('/essay/delete', check_auth, deleteEssay);
router.get('/essay/getpublish', essay_publish_auth, getPublishEssay);
router.get('/essay/getmarkdown', get_the_essay);
router.post('/essay/gethtml');
router.post('/essay/new', check_auth, newEssay);
router.get('/essay/draft');
router.post('/essay/save', check_auth, save_essay);
router.get('/essay/publish', check_auth, publish);
router.get('/essay/getcollection');
router.get('/essay/settag', check_auth, set_essay_tag);
router.get('/essay/read', addEssayReadTime);

//评论
router.get('/essay/comments', get_comments);
router.post('/user/comment', check_auth, add_comment);
router.post('/user/reply', check_auth, add_reply);
router.post('/user/comment/del', check_auth, del_comment);
router.post('/user/reply/del', check_auth, del_reply);

module.exports=router;