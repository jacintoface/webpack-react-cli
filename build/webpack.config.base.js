const path = require('path')
const filePath = require('./webpack.config.file')
const package = require('../package.json')
const autoprefixer = require('autoprefixer')
const resolve = require('./utils').resolve
const config = {
  entry: {
    app: resolve('index.js'),
    vendor: Object.keys(package.dependencies)
  },
  output: {
    filename: '[name].[hash:6].js',
    path: filePath.output,
    publicPath: filePath.publicPath
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['cache-loader', 'babel-loader'],
      exclude: /node_modules/,
      include: path.join(__dirname,'../src')
    }, {
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
  resolve: {
    extensions: ['.js','.jsx','.css','.scss'],
    alias: {
      '@component': resolve('app','components')
    }
  }
}

module.exports = config