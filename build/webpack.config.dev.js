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
    after () {
      opn('http://localhost:8081')
    },
    contentBase: path.join(__dirname,'../dist'),
    historyApiFallback: true,
  },
  module: {
    rules:[{
      test: /\.(css|scss)$/,
      use: [{
        loader: 'style-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true
        }
      }, {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          sourceMap: true,
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            })
          ]
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('template.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['manifest','vendor'],
      minChunks:Infinity,
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