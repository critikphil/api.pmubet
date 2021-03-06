const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
require('dotenv').config({ path: '/run/secrets/envfile_website' });

const extractSass = new ExtractTextPlugin({
    filename: "css/style.css"
});

const config = {
    entry: [
        'babel-polyfill',
        './main.js'
    ],
    output: {
        path: __dirname + "/../api/public",
        filename: 'js/bundle.js',
        publicPath: "http://127.0.0.1:2993/",
    },
    devtool: 'source-map',
    devServer: {
        headers: { "Access-Control-Allow-Origin": "http://127.0.0.1" },
        inline: true,
        port: 2993
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react', 'stage-2']
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract([{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }])
            },
            {
                test: /\.css/,
                use: extractSass.extract([{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }])
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                    }
                }
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        // new webpack.LoaderOptionsPlugin({
        //     headers: {
        //         "Access-Control-Allow-Origin": "http://localhost:3000",
        //         "Access-Control-Allow-Credentials": "true",
        //         "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
        //         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
        //     },
        //     debug: true
        // }),
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'API_URL': JSON.stringify(process.env.API_URL)
        }),
        extractSass
    ]

};

module.exports = config;