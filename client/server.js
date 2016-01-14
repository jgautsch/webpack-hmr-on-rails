var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.hot.config');

// Run a Webpack Dev Server at localhost:8080 to server bundled js/css in dev
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: { colors: true}
}).listen(8080, 'localhost', function(err) {
  if (err) {
    console.log(err);
  }

  console.log('Webpack Dev Server Listening at localhost:8080');
});
