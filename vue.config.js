const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  devServer: {
    port: {{port}}
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
    config.module.rules.delete('svg')
    config.module.rule('svg-smart')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}
