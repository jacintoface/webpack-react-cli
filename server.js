const path = require('path');
const os = require('os')
const cors = require('cors')
const colors = require("colors/safe")
const webpack = require('webpack')
const express = require('express');
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const dotnev = require('dotenv')

dotnev.config()
const app = express()
const config = require('./build/webpack.config.dev')
const compiler = webpack(config);
const devMiddleware = webpackDevMiddleware(compiler)
const { PROXY, PORT = 8081 } = process.env;

app.use(cors());
app.use(devMiddleware)
app.use(webpackHotMiddleware(compiler))

app.listen(PORT, () => {
  colors.rainbow(`服务启动，请打开 http://localhost:${PORT}`)
})





