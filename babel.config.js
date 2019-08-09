// Jest를 위한 바벨 설정
module.exports = {
  presets: [
    ['@babel/preset-env', { 
      targets: { 
        node: 'current' 
      }
    }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ["@babel/plugin-proposal-class-properties", {loose: true}]
  ]
};