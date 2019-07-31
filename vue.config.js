module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    // console.log('config', config)
    // 这里config为webpack全部配置，可以通过 vue inspect output.js 命令查看
    config.plugin('define').tap(args => {
      // 修改plugin选项， args为define插件的配置项
      console.log('args', args, process.env)
      args[0]['process.env']['BASE_URL'] = process.env.BASE_URL
      return args
    })
  }
}
