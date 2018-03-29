var path=require('path');
var static_dir=path.join(__dirname,'public');

var config = {
    debug: process.env.NODE_ENV==='prod'?false:true,
    port:process.env.PORT?process.env.PORT:'6600',

    database:{
        host: 'www.proj.xin',
        user: 'blogblog',
        password: 'jjp123789',
        database: 'blog'
    },
    file_dir:path.join(static_dir,'/cfile'),
    template_dir:path.join(static_dir,'/dist'),
    session_secret:'jjp2018321',

    log_path:path.join(__dirname,'logs'),
}
module.exports=config;