const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./index.web.js'],
  devtool: 'source-map',
  devServer: {
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!(react-native))\//,
        use: {loader: 'babel-loader'},
      },
    ],
  },
  plugins: [new HtmlWebPackPlugin({template: './public/index.html'})],
  resolve: {
    alias: {'react-native$': 'react-native-web'},
  },
};
