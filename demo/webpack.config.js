'use strict';

var webpack = require('webpack')

var env = process.env.NODE_ENV
var config = {
  module: {
    loaders: [
      {
        test: /\.es6$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: 'demo.js',
    path: './demo'
  },
  externals: [
    {
      'admin-components': 'this admin-components',
      'react': 'var React',
      'react-dom': 'var ReactDOM',
      'react-router': 'var ReactRouter',
      'immutable': 'var Immutable'
    }
  ],
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

module.exports = config
