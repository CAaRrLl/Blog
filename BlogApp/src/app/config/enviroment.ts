import {environment} from '../../environments/environment';
const server={
    protocol:'http',
    host:'127.0.0.1',
    port:'6600',
    devHost:'127.0.0.1',
    devPort:'6600'
}
const host=`${server.protocol}://${environment.production?server.host:server.devHost}`;
const port=`${environment.production?server.port:server.devPort}`;
export const config={
    production:environment.production,
    host:host,
    port:port,
    server:`${host}:${port}`
}