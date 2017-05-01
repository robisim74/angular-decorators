'use strict';
let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let isProd = process.env.NODE_ENV === 'production';

if (!isProd) {

    // In development mode, we use JiT compilation with Hot Module Replacement.
    module.exports = {
        entry: {
            'app': './app/main.ts'
        },

        output: {
            path: __dirname,
            filename: 'dist/[name].bundle.js',
            chunkFilename: 'dist/[id].chunk.js',
            publicPath: '/'
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: [
                        'awesome-typescript-loader',
                        'angular-router-loader',
                        'angular2-template-loader',
                        'source-map-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.css$/,
                    loaders: [
                        'style-loader',
                        'css-loader',
                        'raw-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    loaders: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ],
            exprContextCritical: false
        },

        plugins: [
            // Adds script for the bundle in index.html.
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inject: 'body',
                template: 'app/index.html'
            })
        ],

        resolve: {
            extensions: ['.ts', '.js', '.html', '.css', '.scss']
        },

        devtool: 'source-map',

        performance: { hints: false }

    };

} else {

    // In production mode, we use AoT compilation, tree shaking & minification.
    module.exports = {
        entry: {
            'app-aot': './app/main-aot.js'
        },

        output: {
            path: __dirname,
            filename: 'dist/[name].bundle.js',
            chunkFilename: 'dist/[id].chunk.js'
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: [
                        'awesome-typescript-loader',
                        'angular-router-loader?aot=true&genDir=aot/',
                        'source-map-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.css$/,
                    loaders: [
                        'style-loader',
                        'css-loader',
                        'raw-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    loaders: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ],
            exprContextCritical: false
        },

        plugins: [
            // Minimizes the bundle.
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                sourceMap: true
            }),
            // Adds script for the bundle in index.html.
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inject: 'body',
                template: 'app/index.html'
            })
        ],

        resolve: {
            modules: [
                'node_modules',
                path.resolve(__dirname, 'app')
            ],
            extensions: ['.ts', '.js', '.html', '.css', '.scss']
        },

        devtool: 'source-map',

        performance: { hints: false }

    };

}
