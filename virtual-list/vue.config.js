const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置基本路径,使用相对路径,让打包呼出的文件能够直接在本地运行
  publicPath: './',
  // 配置输出文件目录,使用相对路劲输出,让打包输出的文件能够直接在本地运行
  outputDir: './dist',
  // 暂时关闭eslint检测
  lintOnSave: false,
  // 生产环境是否生成SourceMap文件,在打包后可以bug定位
  productionSourceMap: true,
  // webpack -dev-server 配置
  devServer: {
    // 配置自动启动浏览器
    open: true,
    // 端口号
    port: 8081,
    // 服务器代理配置
    proxy: null
  },
  // 第三方插件相关配置
  pluginOptions: {
    // ........
  }
})
