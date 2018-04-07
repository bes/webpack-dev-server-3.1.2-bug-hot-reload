const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config')();

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
}).listen(8081, 'localhost', function resultCb(listenErr) {
  if (listenErr) {
    console.error(listenErr);
  }
  console.log('Listening at localhost:8081');
});
