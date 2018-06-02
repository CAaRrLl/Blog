var config=require('../config');
var path=require('path');
var log4js = require('log4js');

log4js.configure({
    appenders:{
        console:{
            type:'console'
        },
        file:{
            type:'file',
            filename:path.join(config.log_path,'blog.log'), 
        }
    },
    categories:{
        default:{
            appenders:['console','file'],
            level:log4js.levels.WARN
        }
    }
});
var logger = log4js.getLogger();

exports.logger=logger;
exports.connectLogger=log4js.connectLogger(logger,{level:'auto'});