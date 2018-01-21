const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
let config = merge(baseConfig, {
  module: {
    rules: [{
      test: /\.(css|scss)/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
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
      })
    }]
  },
  plugins: [
      new ExtractTextPlugin({
        filename: 'css/[name].[contenhash].css',
        allChunks: true
      })
  ]
})

console.log(JSON.stringify(config))
module.exports = config