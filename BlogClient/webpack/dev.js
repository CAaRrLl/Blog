//开发环境的webpack配置
'use strict';

const webpackMerge = require('webpack-merge');
const common = require('./common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

//webpackMerge()合并多个配置文件为一个
module.exports = webpackMerge(common,{
    //开发环境特有的webpack配置
    devtool:'eval-source-map',
    output:{
        filename: '[name].bundle.js',
    },
    module:{
        rules: [
            {
                test:/\.css$/,
                loaders:ExtractTextPlugin.extract({
                    use:'css-loader'
                })
            },
            {
                test:/\.(scss|sass)$/,
                loaders:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader']
                })
            }
        ],
    },
    plugins:[
        new ExtractTextPlugin({
            filename:'style.[name].css',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'commons',
            chunks:['main','polyfill']
        }),
        // new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './src',
        host:'127.0.0.1',
        port:3000,
        inline: true,
        historyApiFallback: true,
        // hot:true
    },
});