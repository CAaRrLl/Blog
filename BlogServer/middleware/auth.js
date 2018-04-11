var logger = require('../common/logger').logger;
var config = require('../config');
var tool = require('../common/tool');
var code = require('../common/const').code;

var check_auth = function(req, res, next) {
    if(!req.cookies) {
        res.status(200).send({code: code.sessionNoExist, msg: '会话不存在', data: {}});
        return;
    }
    var token = req.cookies[config.cookie_name];
    if(!token) {
        res.status(200).send({code: code.sessionExpire, msg: '会话过期', data: {}});
        return;
    }
    logger.debug('cookie', token, 'fresh', req.cookies[config.cookie_refresh]);
    var result = tool.unsign(token, config.sign_key);
    if(!result) {
        res.status(200).send({code: code.signForge, msg: '签名伪造', data: {}});
        return;
    }
    logger.debug('session', req.session[result], req.session);
    var fresh_tag = req.cookies[config.cookie_refresh];
    //刷新cookie
    if(!fresh_tag) {
        logger.debug('刷新cookie');
        gen_session(req.session[result].id, req.session[result], res, req);
    }
    next();
}
exports.check_auth = check_auth;

var gen_session = function(id, session, res, req) {
    var session_id = tool.session_code(id);
    req.session[session_id] = session;
    var opts = {
        maxAge: config.cookie.maxAge,
        httpOnly: config.cookie.httpOnly,
        signed: false
    };
    res.cookie(config.cookie_name, tool.sign(session_id, config.sign_key), opts);
    res.cookie(config.cookie_refresh, 1, {maxAge: config.cookie.maxAge - 1000 * 60});
}
exports.gen_session = gen_session;