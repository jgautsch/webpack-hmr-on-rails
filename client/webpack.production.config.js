// This can be run like this:
// cd client && $(npm bin)/webpack -w --config webpack.rails.config.js
// Note that Foreman (Procfile.dev) and the rake tasks have been configured
// to take care of running webpack with this config when appropriate.

// NOTE: All stylesheets are handled by the asset pipeline in rails.

var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.common.config');

config.output = {
  filename: '[name]_webpack_bundle.js',
  path: '../app/assets/javascripts/generated'
};

// DefinePlugin takes raw strings and inserts them, so you can put strings of
// JS in here if you want.
// Here we're creating a plugin that ensures the __DEV__ global is `false`,
// and that `NODE_ENV` and `process.env.NODE_ENV` are "production", so react
// gets minified properly for production.
var globalsPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse('false'))
});

config.plugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    mangle: false
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.DefinePlugin({ "process.env": { NODE_ENV: JSON.stringify("production") } }),
  globalsPlugin
];

// See webpack.common.config for adding modules common to both the
// webpack dev server and rails.

config.module.loaders.push(
  { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
  { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
);

module.exports = config;
