var logger = require('../common/logger').logger;
var config = require('../config');
var tool = require('../common/tool');

var check_auth = function(req, res, next) {
    
}

var gen_session = function(id, session, res, req) {
    var session_id = tool.session_code(id);
    req.session[session_id] = session;
    var opts = {
        maxAge: 1000 * 60 * 2,
        httpOnly: true,
        signed: false
    };
    res.cookie(config.cookie_name, tool.sign(session_id, config.sign_key), opts);
}
exports.gen_session = gen_session;