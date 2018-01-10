const path = require('path')

module.exports = {
  entry: path.join(__dirname, '../src', 'index'),
  output: path.join(__dirname, '../dist'),
  publicPath: '',
  imgPath: path.join(__dirname, '../dist/img'),
  fontPath: path.join(__dirname, '../dist/font'),
  mediaPath: path.join(__dirname, '../dist/media'),
}