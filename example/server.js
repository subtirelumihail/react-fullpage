var config = require('./webpack.config.js');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');

config.entry.unshift('webpack-dev-server/client?http://localhost:9090');

new webpackDevServer(webpack(config), {
  contentBase: config.output.path,
  progress: true,
  inline:   true,
}).listen(9090, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + 9090);
});
