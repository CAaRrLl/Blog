var logger = require('../common/logger').logger;
var code = require('../common/const').code;
var config = require('../config');
var tool = require('../common/tool');
var gen_session = require('../middleware/auth').gen_session;
var add_user = require('../model/user').add_user;
var check_user = require('../model/user').check_user;
var fb = require('./feedback');

var signUp = function (req, res, next) {
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var password = req.body.password;
    if(!tool.check_notnull(name)||!tool.check_phone(phone)
        ||!tool.check_email(email)||!tool.check_password(password)) {
        logger.warn('请求参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }
    logger.debug('注册用户为',{昵称:name,手机:phone,邮箱:email,密码:password});
    add_user(name,email,phone,password,function(err) {
        if(err) {
            logger.warn('注册用户失败',err);
            fb(res, code.userRegistered, '用户已被注册', {});
            return;
        }
        logger.debug("注册用户成功");
        fb(res, code.success, '请求参数错误', {});
    });
}
exports.signUp = signUp;

var signIn = function (req, res, next) {
    var account = req.body.account;
    var password = req.body.password;
    if(!(tool.check_email(account)||tool.check_phone(account))
        ||!tool.check_password(password)) {
        logger.warn('请求参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }
    logger.debug('登陆用户为',{账号:account,密码:password});
    check_user(account, password, function(err, result) {
        if(err) {
            logger.error(err);
            fb(res, code.paramsErr, '数据库出错', {});
            return;
        }
        logger.debug('检查结果',result);
        if(result.length <= 0) {
            logger.debug('账号密码不匹配');
            fb(res, code.passwordNoMatch, '账号密码不匹配', {});
            return;
        }
        var session = result[0];
        gen_session(session.id, session, res, req);
        fb(res, code.success, '', {});
    });
}
exports.signIn = signIn;

var layout = function (req, res, next) {
    var session_id = tool.get_sessionid(req.cookies[config.cookie_name]);
    var opt = {
        maxAge: config.cookie.maxAge,
        httpOnly: config.cookie.httpOnly
    }
    delete req.session[session_id];
    res.clearCookie(config.cookie_name, opt);
    res.clearCookie(config.cookie_refresh, {maxAge: config.cookie.maxAge - 1000 * 60});
    fb(res, code.success, '', {});
}
exports.layout = layout;