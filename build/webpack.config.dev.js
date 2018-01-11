const path = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const opn = require('opn')
const resolve = require('./utils').resolve
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.config.base')

let config = webpackMerge(baseWebpackConfig, {
	entry: {
		patch: 'react-hot-loader/patch',
	},
	devServer: {
		port: 8081,
		host: '0.0.0.0',
		inline: true,
		disableHostCheck: true,
		hot: true,
		overlay: {
			errors: true,
			warnings: false
		},
		after() {
			opn('http://localhost:8081')
		},
		contentBase: path.join(__dirname, '../dist'),
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve('template.html')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['manifest', 'vendor'],
			minChunks: Infinity,
			filename: 'common.js'
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx', '.css', '.scss'],
		alias: {
			'@component': resolve('app', 'components'),
			'@action': resolve("app", 'actions')
		}
	}
})
module.exports = config