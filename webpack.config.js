'use strict';

var webpack = require('webpack')

var env = process.env.NODE_ENV
var config = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-addons-pure-render-mixin': 'var React.addons.PureRenderMixin',
      'immutable': 'var Immutable'
    }
  ],
  output: {
    library: 'admin-components',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}

if (env === 'development') {
  config.devtool = 'inline-source-map'
}

module.exports = config
