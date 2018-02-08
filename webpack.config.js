const path = require('path');
 
module.exports = {
  context: path.join(__dirname, './webAPI/src'),
  entry: [
    './index.jsx',
  ],
  output: {
    path: path.join(__dirname, './webAPI/src/www'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      }, {
      test: /\.css$/,
      loader: 'css-loader',
      query: {
      modules: true,
      localIdentName: '[name]__[local]___[hash:base64:5]'
     }
}
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
};