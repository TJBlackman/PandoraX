const path = require('path');
const { merge } = require('webpack-merge');
const shared = require('./webpack.shared');
const Dotenv = require('dotenv-webpack');

process.env.NODE_ENV = 'production';

const development = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    open: true,
    hot: true,
    historyApiFallback: true,
    clientLogLevel: 'warn',
  },
  plugins: [
    new Dotenv({
      path: path.join(__dirname, '.develop.env'),
    }),
  ],
};

module.exports = merge(shared, development);
