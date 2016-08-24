module.exports = {
  entry: {
    Game: ['./js/game.js'],
    Main: ['./js/main.js'],
  },
  output: {
    path: './build/js',
    filename: 'all[name].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
    ],
  },
}
