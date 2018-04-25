var path = require('path');
var static_dir = path.join(__dirname, 'public');

var config = {
    debug: process.env.NODE_ENV === 'prod' ? false: true,
    port: process.env.PORT? process.env.PORT: '6600',

    database: {
        host: 'www.proj.xin',
        user: 'blogblog',
        password: 'jjp123789',
        database: 'blog'
    },
    file_dir: path.join(static_dir, '/cfile'),
    template_dir: path.join(static_dir, '/dist'),
    session_secret: 'jjp2018321',
    cookie_name: 'blog',
    cookie_refresh: 'fresh',

    cookie: {
        maxAge: 1000 * 60 * 10,
        httpOnly: true,
    },

    sign_key: '2042201842',

    file_key: '19960620',

    web_host: 'http://127.0.0.1:4200',

    log_path: path.join(__dirname, 'logs'),
}
module.exports = config;