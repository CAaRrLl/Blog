var config = require('../config');

var cors = function(req, res, next) {
    res.set('Access-Control-Allow-Origin',config.web_host);
    res.set('Access-Control-Allow-Credentials','true');
    res.set('Access-Control-Allow-Method','GET,POST,PUT,OPTIONS');
    res.set('Access-Control-Allow-Headers','Content-Type');
    next();
}
module.exports = cors;
