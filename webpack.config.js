const webpack = require('webpack')

module.exports = {
  entry: {
    main: ['./assets/js/main.js'],
  },
  output: {
    path: './build/js',
    filename: 'all.js',
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
  // devtool: 'cheap-module-source-map',
  devtool: 'eval',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // NODE_ENV: JSON.stringify('production'),
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
}
