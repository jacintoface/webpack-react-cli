const path = require('path')
const filePath = require('./webpack.config.file')
const resolve = require('./utils').resolve
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const WebpackBuildNotifier = require('webpack-build-notifier')

const config = {
  entry: {
    app: resolve('index.js')
  },
  output: {
    filename: '[name].[hash:6].js',
    path: filePath.output,
    publicPath: filePath.publicPath
  },
  module: {
    rules: [{
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: '[name].[hash:6].[ext]',
          esModule: false,
          outputPath: 'public/images'
        }
      }],
      exclude: /node-modules/
    }, {
      test: /\.(woff2?|eot|ttf|otf)$/,
      loader: 'url-loader',
      options: {
        limit: 5000,
        name: filePath.fontPath
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 100,
        name: filePath.mediaPath
      }
    }]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: filePath.assetsPath, to: path.join(filePath.output, 'static')
      }]
    ),
    new HardSourceWebpackPlugin(),
    new ProgressBarWebpackPlugin(),
    new WebpackBuildNotifier()
  ]
}

module.exports = config
