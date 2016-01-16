# Webpack + Rails + HMR

Example setup of using npm, babel, and webpack in a new or existing Rails app, for Nash.rb talk

The basic example is front-end framework agnostic, and instead focuses on a working Webpack + Rails setup with HMR. You can take this basic setup and add whatever else you'd like. We use a React + React Router + Redux setup on top of this.

On a greenfield app, you may want your client and server totally separate, however this repo shows an approach

To see all the files that changed to add Webpack setup to the basic Rails app, [check out this PR](https://github.com/jgautsch/webpack-hmr-on-rails/pull/1/files)

Each configuration option in the webpack config files contain comments explaining their purpose.

## Getting Started

```shell
$ git clone https://github.com/jgautsch/webpack-hmr-on-rails.git
$ cd webpack-hmr-on-rails
$ bundle install
$ bundle exec rake db:create:all
$ foreman start -f Procfile.dev
```

Open [http://localhost:3000](http://localhost:3000) in browser.

## Pieces Involved

### `Procfile.dev`

In development, you'll have 2 processes running:
  1. Rails app server
  2. Webpack Dev Server

Foreman handles running of both processes with a single command

### `client/`

The `client/` directory is where the front end code will go. There are 2 main webpack config files there, one for development (`client/webpack.hot.config.js`) and one for production (`client/webpack.production.config.js`). Shared config found in `webpack.common.config.js` is included in both.


### `config/environments/development.rb`

The rails `development.rb` config file contains the following code for proxying requests looking for a webpack bundle over to the Webpack Dev Server we have running:

```ruby
# In development, send requests containing "*webpack_bundle.js" to the
# webpack-dev-server running on localhost:8080
# We've configured the output names of our webpack bundled files to be
# `[name]_webpack_bundle.js`, so we always know when we're requesting one.
config.action_controller.asset_host = Proc.new { |source|
  if source =~ /webpack_bundle\.js$/i
    "http://localhost:8080"
  end
}
```

### `client/scripts/App.js`

This is the only defined entry point in our webpack config. This is where we write our JS app (whatever form that takes for you).


### Rake tasks

Two rake tasks have been defined:

Bundling the client for production and sticking into `app/assets/javascripts/generated` to be served through asset pipeline.
```shell
$ bundle exec rake webpack:build
```

Removing generated/bundled javascripts.
```shell
$ bundle exec rake webpack:clean
```

Additionally, `$ bundle exec rake assets:precompile` has been enhanced to always build the webpack bundle, which is convenient for deployment.


### Resources/Credits
  - [rails on maui tutorial](http://www.railsonmaui.com/blog/2014/10/03/integrating-webpack-and-the-es6-transpiler-into-an-existing-rails-project/)
  - [Kevin Old's tutorial/blog](http://kevinold.com/2015/02/04/configure-webpack-dev-server-and-react-hot-loader-with-ruby-on-rails.html)
  - [SurviveJS - Developing with Webpack](http://survivejs.com/webpack_react/developing_with_webpack/)
  - [Dan Abromov - HMR and Time Travel](https://www.youtube.com/watch?v=xsSnOQynTHs)

### License

MIT
