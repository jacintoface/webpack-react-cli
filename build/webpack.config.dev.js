const path = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = require('./utils').resolve
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.config.base')

let config = webpackMerge(baseWebpackConfig, {
    mode: 'development',
    entry: {
        patch: 'react-hot-loader/patch',
    },
    devServer: {
        port: 8081,
        inline: true,
        disableHostCheck: true,
        hot: true,
        overlay: {
            errors: true,
            warnings: false
        },
        open: true,
        contentBase: path.join(__dirname, '../dist'),
        historyApiFallback: true,
    },
    module: {
        rules: [{
            test: /\.(css|scss)$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            }, {
                loader: 'sass-loader'
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve('template.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
        alias: {
            '@component': resolve('app', 'components'),
            '@action': resolve("app", 'actions'),
            'react-dom': '@hot-loader/react-dom'
        }
    }
})
module.exports = config
