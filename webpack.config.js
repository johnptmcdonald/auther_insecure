module.exports = {
  // babel-polyfill enables async-await in our client js
  entry: ['babel-polyfill', './browser/App.js'],
  mode: 'development',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  }
}
