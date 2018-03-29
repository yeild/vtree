const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
  output: {
    filename: '[name].min.js',
  },
  plugins: [
    new CleanWebpackPlugin(
      ['dist'],
      {
        root: path.resolve(__dirname, '..'),
        verbose: false
      }
    )
  ]
})