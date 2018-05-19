var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var errorhandler = require('errorhandler');
var cors = require('./middleware/cors');
var web_router = require('./web_router').router;
var api_router = require('./api_router');
var db = require('./common/db');
var config = require('./config');
var logger = require('./common/logger').logger;

var app=express();

//注册日志中间件
app.use(require('./common/logger').connectLogger);

//供用户下载的静态文件
app.use('/api/file/get', express.static(config.file_dir));
//前端模板
app.use('/', express.static(config.template_dir));

// 解析 application/json
app.use(bodyParser.json({limit:'1mb'}));	

// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true,limit:'1mb'}));

app.use(cookieParser());
app.use(session({
    secret:config.session_secret,
    resave:false,
    saveUninitialized:false
}));

//解决跨域问题
if(config.debug) {
    app.use('/api', cors);
}

//前端api请求
app.use('/api', api_router);
//前端页面请求
app.use(web_router);

//处理错误
if(config.debug) {
    app.use(errorhandler());
}else {
    app.use(function(err,req,res,next) {
        logger.error(err);
        res.status(500).send('server error');
    })
}

//初始化数据库
require('./model/init').init_table();

//服务器监听
app.listen(config.port,function() {
    logger.info('server is listening on port',config.port);
    logger.info('static file dirname',config.file_dir);
    logger.info('static template dirname',config.template_dir);
})