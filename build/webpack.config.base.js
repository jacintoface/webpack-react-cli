const path = require('path')
const filePath = require('./webpack.config.file')
const resolve = require('./utils').resolve
const config = {
  entry: {
    app: resolve('index.js')
  },
  output: {
    filename: '[name].[hash:6].js',
    path: filePath.output,
    publicPath: filePath.publicPath
  },
  devtool: "inline-cheap-module-source-map",
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['cache-loader', 'babel-loader'],
      exclude: /node_modules/,
      include: path.join(__dirname,'../src')
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: filePath.imgPath
        }
      }],
      exclude: /node-modules/
    },{
      test: /\.(woff2?|eot|ttf|otf)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: filePath.fontPath
      }
    },{
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: filePath.mediaPath
      }
    }]
  },
}

module.exports = config
