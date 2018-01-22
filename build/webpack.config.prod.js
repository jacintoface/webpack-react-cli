const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
let config = merge(baseConfig, {
  node: {
    fs: 'empty'
  },
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
      }),
      new UglifyWebpackPlugin({
        uglifyOptions: {
          //在删除不可访问的代码或未使用的声明等时显示警告
          warning: false
        },
        sourceMap: true,
        parallel: true
      }),
      new CopyWebpackPlugin([{
        force: true, // 后面的文件会覆盖先前的文件
        from: path.join(__dirname, '../src/assets'),
        to: path.join(__dirname, 'dist'),
        flatten: false //是否只拷贝文件不拷贝文件夹
      }]),
      /*压缩css*/
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          //避免cssnano重复计算z-index
          safe: true,
          discardCommonts: {removeAll: true}
        },
        canPrint: true,
        cssProcessor: require('cssnano'), //指定压缩css器
        assetNameRegExp:/\.css$/g
      })
  ]
})
module.exports = config