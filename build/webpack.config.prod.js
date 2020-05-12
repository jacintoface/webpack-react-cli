const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const yargs = require('yargs')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const Happypack = require('happypack')
const happyThreadPool = Happypack.ThreadPool({ size: 5 })
const { performance } = yargs.argv

let config = merge(baseConfig, {
  mode: 'production',
  module: {
    noParse: /lodash/,
    rules: [{
      test: /\.(c|sc|sa)ss$/,
      use: 'happypack/loader?id=css',
      exclude: /node_modules/
    }, {
      test: /\.(js|jsx)$/,
      use: 'happypack/loader?id=js',
      exclude: /node_modules/
    }]
  },
  optimization: {
    minimize: true,
    sideEffects: false,
    usedExports: true,
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxInitialRequests: 4,
      automaticNameDelimiter: '_',
      name: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: '[name].bundle.js'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new Happypack({
      id: 'css',
      threadPool: happyThreadPool,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 2
          }
        },
        'postcss-loader',
        'sass-loader']
    }),
    new Happypack({
      id: 'js',
      threadPool: happyThreadPool,
      use: ['babel-loader']
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        discardCommonts: { removeAll: true }
      },
      canPrint: true,
      cssProcessor: require('cssnano'),
      assetNameRegExp: /\.css$/g
    })
  ]
})

if (performance) {
  config = (new SpeedMeasurePlugin()).wrap(config)
}

module.exports = config
