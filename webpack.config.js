const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: './src/client/index',

  output: {
    filename: "main.js",
    path: __dirname + "/dist"
  },

  devtool: "source-map",

  devServer:{
    contentBase: './dist',
    proxy: {
      '/api': 'http://localhost:3000'
    },
    open: true
  },

  resolve: {
    extensions: [".ts", ".tsx", '.js']
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      base: './dist'
    })
  ]
}

