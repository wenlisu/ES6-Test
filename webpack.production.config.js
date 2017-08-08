var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var SCRIPT_PATH = path.resolve(APP_PATH, 'scripts');
var STYLE_PATH = path.resolve(APP_PATH, 'styles');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var BOWER_PATH = path.resolve(ROOT_PATH, 'bower_components');

module.exports = {
    entry: {
        css: path.resolve(SCRIPT_PATH, 'css.js'),


        i20170720: path.resolve(SCRIPT_PATH, 'index.js'),        

        // vendors: ['whatwg-fetch', 'babel-polyfill', 'jquery']
        vendors: ['whatwg-fetch', 'babel-polyfill']
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].[hash].js'
    },
    resolve: {
        alias: {
            // lodash: path.resolve(BOWER_PATH, 'lodash/lodash.js')
        }
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            include: APP_PATH,
            query: {
                presets: ['es2015', 'stage-0']
            }
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
            include: STYLE_PATH
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=40000&name=imgs/[hash].[ext]'
        }, {　　　　　　
            test: /\.html$/,
            include: TEM_PATH,
            loader: 'html-withimg-loader'　
        }]
    },
    plugins: [
        //enable uglify
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        }),
        new CleanPlugin('build'),
        //split vendors script
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new HtmlwebpackPlugin({
            title: '提额活动',
            template: path.resolve(TEM_PATH, 'index.html'),
            filename: 'index.html',
            chunks: ['css', 'vendors', 'i20170720'],
            inject: {
                head: ['css'],
                body: ['vendors', 'i20170720']
            },
        })
    ]
};