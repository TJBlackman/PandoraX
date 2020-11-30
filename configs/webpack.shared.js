const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    ui: path.join(__dirname, '../src/ui/index.js'),
    client: path.join(__dirname, '../src/client-scripts/index.js'),
    background: path.join(__dirname, '../src/background-scripts/index.js'),
  },
  output: {
    filename: `[name].js`,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, '../src/ui/index.html'),
      filename: './index.html',
      chunks: ['ui'],
      minify: true,
    }),
    new CopyPlugin([
      {
        from: path.join(__dirname, '../src/manifest.json'),
        to: path.join(__dirname, '../dist'),
      },
    ]),
  ],
};
