import {environment} from '../../environments/environment';
const server={
    protocol:'https',
    devProtocol:'http',
    host:'www.proj.xin',
    port:'443',
    devHost:'127.0.0.1',
    devPort:'6600'
}
const host=`${environment.production?server.protocol:server.devProtocol}://${environment.production?server.host:server.devHost}`;
const port=`${environment.production?server.port:server.devPort}`;
export const config={
    production:environment.production,
    host:host,
    port:port,
    server:`${host}:${port}`
}