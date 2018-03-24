var express=require('express');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var api_router=require('./api_router');
var db=require('./common/db');
var config=require('./config');
var logger=require('./common/logger').logger;

var app=express();

//注册日志中间件
app.use(require('./common/logger').connectLogger);

app.use(cookieParser(config.session_secret));
app.use(session({
    secret:config.session_secret,
    resave:false,
    saveUninitialized:false
}));

//前端api请求
app.use('/api',api_router);

//初始化数据库
require('./model/init').init_table();

//服务器监听
app.listen(config.port,function(){
    logger.info('server is listening on port',config.port)
})