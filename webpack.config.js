module.exports = {
  entry: {
    Main: ['./js/main.js'],
  },
  output: {
    path: './build/js',
    filename: 'all.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
    ],
  },
}
