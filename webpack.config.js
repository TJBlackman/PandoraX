const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, './src/ui/index.js'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, './src/ui/index.html'),
      filename: './index.html'
    }),
    new CopyPlugin([
      { from: path.join(__dirname, './src/extension-configs'), to: path.join(__dirname, './dist') },
      {
        from: path.join(__dirname, './src/extension-scripts/background-scripts'),
        to: path.join(__dirname, './dist/background-scripts')
      },
      {
        from: path.join(__dirname, './src/extension-scripts/client-scripts'),
        to: path.join(__dirname, './dist/client-scripts/')
      }
    ])
  ]
};
