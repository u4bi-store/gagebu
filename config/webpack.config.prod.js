const defaultConfig = require('./webpack.config')
const pkg = require('../package.json')
const TARGET = pkg.assetPath

module.exports = {
  ...defaultConfig,
  mode: 'production'   
}

