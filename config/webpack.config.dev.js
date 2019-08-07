const defaultConfig = require('./webpack.config')
const pkg = require('../package.json')
const TARGET = pkg.assetPath

module.exports = {
  ...defaultConfig,
  
  devServer:{
    contentBase: TARGET,
    proxy: {
      '/api': 'http://localhost:3000'
    },
    open: true,
    historyApiFallback: true,
    publicPath: '/'
  },
}

