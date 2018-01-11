//生产环境的webpack配置
'use strict';

const path = require('path');
const webpackMerge = require('webpack-merge');
const common = require('./common');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//webpackMerge()合并多个配置文件为一个
module.exports = webpackMerge(common,{
    //生产环境特有的webpack配置
    output:{
        path: path.join(process.cwd(),'dist'),
        filename: '[name].[chunkhash].js'
    },
    module:{
        rules: [
            {
                test:/\.css$/,
                loaders:ExtractTextPlugin.extract({
                    fallback:'style-loader',
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
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'commons',
            chunks:['main','polyfill']
        }),
        new ExtractTextPlugin('css/style.[chunkhash].css')
    ]
});