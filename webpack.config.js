/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: __dirname,
    filename: 'handler.js',
    libraryTarget: 'umd',
    library: 'morty',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
  externals: ['aws-sdk', nodeExternals()],
  plugins: [
    new webpack.optimize.DedupePlugin(),
  ],
};
