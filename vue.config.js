
const ip = require('ip')

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  configureWebpack: {
    externals: {},
    plugins: [],
    optimization: {
      minimizer: []
    }
  },
  chainWebpack: config => {
    // config.resolve.alias.set('@', resolve('src'))
    },
  devServer: {
    host: ip.address(),
    open: true, // 自动打开浏览器
    port: 8800,
    // 代理跨域
    proxy: {
      '/api': {
        target: 'http:192.168.12.19:9000/api',
        changeOrigin: true,
        ws: false
      }
    }
  }
}
