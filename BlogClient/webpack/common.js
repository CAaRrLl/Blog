//开发环境和生产环境公共的webpack配置
'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports={
    entry:{
        'main':path.join(process.cwd(),'/src/main.aot.ts'),
        'polyfill':path.join(process.cwd(),'/src/polyfill.ts')
    },
    module:{
        rules: [
            // {
            //     test:/\.js$/,
            //     loaders:['babel-loader'],
            //     exclude:'/node_modules'
            // },
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
                exclude:'/node_modules'
            },
            {
                test: /\.html$/,
                loaders: 'raw-loader'
            },
            {
                test:/\.(png|PNG|jpg|JPG|gif|GIF)$/,
                loaders:'url-loader?limit=8192',
                query:{
                    name:'img/[hash].[name].[ext]'
                }
            },
            {
                test:/\.(eot|svg|ttf|woff)/,
                loaders:'file-loader',
                query:{
                    name:'font/[hash].[name].[ext]'
                }
            }
        ],
    },
    plugins:[
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(process.cwd(),'/src/index.html'),
            chunk:['polyfill','main'],
            chunksSortMode: function (chunk1, chunk2) {
                let order = ['polyfill','main'];
                let order1 = order.indexOf(chunk1.names[0]);
                let order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            }
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.join(process.cwd(), 'src')
        )
    ],
    resolve:{
        modules:[
            'node_modules',
            path.resolve(process.cwd(),'src')
        ],
        extensions: ['.ts', '.js']
    }
};