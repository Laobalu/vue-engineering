module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    // 这里config为webpack全部配置，可以通过 vue inspect > output.js 命令查看
    config.plugin('define').tap(args => {
      // 修改plugin选项， tap方法修改插件参数，args为define插件的配置项
      args[0]['process.env']['BASE_URL'] = process.env.BASE_URL
      return args
    })
  }
}
