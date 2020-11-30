const path = require('path');
const { merge } = require('webpack-merge');
const shared = require('./webpack.shared');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

process.env.NODE_ENV = 'production';

const development = {
  mode: 'production',
  plugins: [
    new Dotenv({
      path: path.join(__dirname, '.production.env'),
    }),
  ],
};

module.exports = merge(shared, development);
