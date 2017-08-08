var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var SCRIPT_PATH = path.resolve(APP_PATH, 'scripts');
var STYLE_PATH = path.resolve(APP_PATH, 'styles');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');
var BOWER_PATH = path.resolve(ROOT_PATH, 'bower_components');

module.exports = {
    entry: {
        css: path.resolve(SCRIPT_PATH, 'css.js'),

        index: path.resolve(SCRIPT_PATH, 'index.js'),        

        // vendors: ['whatwg-fetch', 'babel-polyfill', 'jquery']
        vendors: ['whatwg-fetch', 'babel-polyfill']
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    resolve: {
        alias: {
            // flexible: path.resolve(APP_PATH, 'flexible.js'),
            // xdLocalStoragePostMessageApi: path.resolve(APP_PATH, 'xdLocalStoragePostMessageApi.min.js')
        }
    },
    //enable dev source map
    devtool: 'eval-source-map',
    //enable dev server
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    },
    node: {
        fs: "empty"
    },
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            include: APP_PATH,
            loader: "jshint-loader"
        }],
        loaders: [{
                test: /\.js?$/,
                loader: 'babel',
                include: APP_PATH,
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }, {
                test: /\.scss$/,
                loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
                include: STYLE_PATH
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=40000'
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader?min=false'
            }
        ]
    },

    //custom jshint options
    // any jshint option http://www.jshint.com/docs/options/
    jshint: {
        "esnext": true
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),

        new HtmlwebpackPlugin({
            title: '活动',
            template: path.resolve(TEM_PATH, 'index.html'),
            filename: 'index.html',
            chunks: ['css', 'vendors', 'index'],
            inject: {
                head: ['css'],
                body: ['vendors', 'index']
            },
        })
    ]
};