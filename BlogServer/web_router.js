var express = require('express');
var path = require('path');
var config = require('./config');

var router = express.Router();

router.all('/*',function(req, res, next) {
    //访问不到资源的页面返回首页
    res.status(200).sendFile(path.join(config.template_dir,'/index.html'));
});
exports.router=router;

const routes = {
    blog: '/blog',           //首页
    sign: '/user/sign',      //用户注册登陆界面       
}
exports.routes = routes;