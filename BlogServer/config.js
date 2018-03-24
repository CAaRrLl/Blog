var path=require('path');

var config = {
    debug: true,
    port:6600,

    database:{
        host: 'www.proj.xin',
        user: 'blogblog',
        password: 'jjp123789',
        database: 'blog'
    },
    session_secret:'jjp2018321',

    log_path:path.join(__dirname,'logs'),
}

module.exports=config;