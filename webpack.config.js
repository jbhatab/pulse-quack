var sassPaths = require("node-neat").includePaths.map(function(sassPath) {
    return "includePaths[]=" + sassPath;
}).join("&");

module.exports = {
  entry: './web/static/js/app.js',
  output: {
    path: './priv/static/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$|app.js$|routes\/routes.js$/,
        loader: 'jsx-loader?insertPragma=React.DOM&harmony'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap&' + sassPaths
      }
    ]
  }
};
