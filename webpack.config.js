const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const pkg = require('./package.json')
const TARGET = pkg.assetPath

module.exports = {
  mode: 'development',

  entry: './src/client/index',

  output: {
    filename: `${TARGET}/main.js`,
    path: path.resolve(__dirname, pkg.outputPath)
  },

  devtool: "source-map",

  devServer:{
    contentBase: TARGET,
    proxy: {
      '/api': 'http://localhost:3000'
    },
    open: true,
    historyApiFallback: true,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['./src', 'node_modules'],
  },

  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        loader: "ts-loader",
        options: {
          configFile: 'tsconfig-client.json'
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: './node_modules/react/umd/react.production.min.js', 
      to: `./${TARGET}/react.production.min.js`
    }, {
      from: './node_modules/react-dom/umd/react-dom.production.min.js', 
      to: `./${TARGET}/react-dom.production.min.js`
    }, {
      from: './node_modules/superagent/dist/superagent.min.js',
      to: `./${TARGET}/superagent.min.js`
    }, {
      from: './node_modules/antd-mobile/dist/antd-mobile.min.css',
      to: `./${TARGET}/antd-mobile.min.css`
    }, {
      from: './node_modules/antd-mobile/dist/antd-mobile.min.css.map',
      to: `./${TARGET}/antd-mobile.min.css.map`
    }, {
      from: './node_modules/antd-mobile/dist/antd-mobile.min.js',
      to: `./${TARGET}/antd-mobile.min.js`
    }]),
    new HtmlWebpackPlugin({
      template: './index.html',
      base: `/${TARGET}`,
      templateParameters: {
        assetPath: TARGET
      }
    })
  ],

  externals: [
    {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'superagent': 'superagent',
      'antd-mobile': 'window["antd-mobile"]',
    },
  ]
}

