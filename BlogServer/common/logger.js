var config=require('../config');
var path=require('path');
var log4js = require('log4js');

log4js.configure({
    appenders:{
        console:{
            type:'console'
        },
        warn:{
            type:'file',
            filename:path.join(config.log_path,'blogwarn.log'), 
        },
        debug:{
            type:'file',
            filename:path.join(config.log_path,'blogdebug.log'), 
        },
        warnFilter: {
            type: "logLevelFilter",
            appender: "warn",
            level: "warn",
            maxLevel: "fatal"
        }
    },
    categories:{
        default:{
            appenders:['console', 'debug', 'warnFilter'],
            level: 'debug'
        }
    }
});
var logger = log4js.getLogger();

exports.logger=logger;  
exports.connectLogger=log4js.connectLogger(logger,{level:'auto'});