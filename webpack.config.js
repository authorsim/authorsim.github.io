module.exports = {
    entry: {
      Main: "./js/main.js",
      Game: "./js/game.js"
    },
    output: {
        path: "./build/js",
        filename: "all[name].js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel" }
        ]
    }
}
