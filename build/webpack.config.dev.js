const path = require('path')
const opn = require('opn')
const webpack = require('webpack')
const yargs = require('yargs')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { cssLoaders, resolve } = require('./utils')
const baseWebpackConfig = require('./webpack.config.base')
const filePath = require('./webpack.config.file')

const { performance } = yargs.argv
let config = merge(baseWebpackConfig, {
  mode: 'development',
  entry: [resolve('index.tsx'), "webpack-hot-middleware/client"],
  module: {
    rules: [{
      test: /\.(jsx?|tsx?)$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
      include: path.join(__dirname, '../src')
    }, {
      test: /\.(css|scss)$/,
      use: cssLoaders({
        loader: 'sass-loader'
      })
    }, {
      test: /\.less$/,
      use: cssLoaders({
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      })
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
