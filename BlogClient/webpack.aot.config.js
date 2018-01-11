'use strict';

let final = {};
const env = process.env.NODE_ENV;
const dev = require('./webpack/dev');
const prod = require('./webpack/prod');

switch (env){
    case 'dev':
        final = dev;
        break;
    case 'prod':
        final = prod;
        break;
    default:
        break;
}

module.exports = final;