const { merge } = require('webpack-merge');
const shared = require('./webpack.shared');

process.env.NODE_ENV = 'production';

const development = {
  mode: 'production',
};

module.exports = merge(shared, development);
