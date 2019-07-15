const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
    new CopyWebpackPlugin([{
      from: './node_modules/react/umd/react.production.min.js', 
      to: 'react.production.min.js'
    }, {
      from: './node_modules/react-dom/umd/react-dom.production.min.js', 
      to: 'react-dom.production.min.js'
    }, {
      from: './node_modules/superagent/dist/superagent.min.js',
      to: 'superagent.min.js'
    }]),
    new HtmlWebpackPlugin({
      template: './index.html',
      base: './dist'
    })
  ],

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'superagent': 'superagent'
  }
}

