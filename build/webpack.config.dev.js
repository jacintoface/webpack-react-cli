const path = require('path')
const opn = require('opn')
const webpack = require('webpack')
const yargs = require('yargs')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const resolve = require('./utils').resolve
const baseWebpackConfig = require('./webpack.config.base')
const filePath = require('./webpack.config.file')

const { performance } = yargs.argv
let config = webpackMerge(baseWebpackConfig, {
  mode: 'development',
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
    open: false,
    contentBase: filePath.output,
    historyApiFallback: true,
    publicPath: filePath.publicPath
  },
  module: {
    rules: [{
      test: /\.(jsx?|tsx?)$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
      include: path.join(__dirname, '../src')
    }, {
      test: /\.(css|scss)$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: process.env.NODE_ENV === 'development',
          reloadAll: true,
          ignoreOrder: true
        }
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1
        }
      }, {
        loader: 'sass-loader'
      }]
    }]
  },
  devtool: 'inline-cheap-module-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/template.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
    alias: {
      '@component': resolve('app', 'components'),
      '@action': resolve('app', 'actions')
    }
  }
})
if (performance) {
  config = (new SpeedMeasurePlugin()).wrap(config)
}
module.exports = config
