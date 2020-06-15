const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.resolve = (...route) => {
  return path.join.apply(null, [__dirname, '../src', ...route]);
};

exports.cssLoaders = (...loaders) => {
  return [{
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: process.env.NODE_ENV === 'development',
      reloadAll: true,
      ignoreOrder: true
    }
  }, {
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  }, ...loaders];
};
