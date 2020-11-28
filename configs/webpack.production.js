const { merge } = require('webpack-merge');
const shared = require('./webpack.shared');
const Dotenv = require('dotenv-webpack');

process.env.NODE_ENV = 'production';

const development = {
  mode: 'production',
  plugins: [
    new Dotenv({
      path: path.join(__dirname, '.env.production'),
    }),
  ],
};

module.exports = merge(shared, development);
