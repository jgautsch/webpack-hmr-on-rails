var webpack = require('webpack');
var path = require('path');

module.exports = {
  // 'context' sets the directory where webpack looks for module
  // files you list in your 'require' and/or 'import' statements
  context: __dirname,

  // 'entry' specifies the entry point, where webpack starts reading
  // all dependencies listed and bundling them into the output file.
  // The entrypoint can be anywhere and be named anything - here we are
  // calling it 'App' and storing it in the './scripts'
  // directory. We can define multiple entrypoints, and probably will
  // for each different Rails layout, but for proof of concept I'll start
  // with one.
  entry: {
    main: ['./scripts/App.js']
  },

  // load jQuery and toastr from outside webpack bundle (so we don't
  // duplicate them by having them in our package.json as dependencies)
  externals: {
    jquery: 'var jQuery'
  },

  // 'resolve.root' is the directory or array of dirs that contain
  // your modules. This is used to add individual directories to
  // the search path.
  // NOTE: the dirs MUST be specified with their absolute path
  resolve: {
    root: [path.join(__dirname, 'scripts'),
           path.join(__dirname, 'assets/javascripts'),
           path.join(__dirname, 'assets/stylesheets')],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.scss', '.css', '.config.js']
  },

  // The 'module' and 'loaders' options tell webpack to use loaders, and which
  // ones to use. Loaders are things that know how to load certain file types.
  // You define a match criteria, and then tell webpack how to load that type of
  // file. You can load things like images, fonts, stylesheets etc.
  // See http://webpack.github.io/docs/using-loaders.html
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded&imagePath=/assets/images&includePaths[]=' +
                path.resolve(__dirname, './styles')
      },
      { test: /\.woff$/, loader: 'url-loader?limit=10000mimetype=application/font-woff' },
      { test: /\.woff2$/, loader: 'url-loader?limit=10000mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'file-loader' },
      { test: /\.eot$/, loader: 'file-loader' },
      { test: /\.svg$/, loader: 'file-loader' }
    ]
  }
};
