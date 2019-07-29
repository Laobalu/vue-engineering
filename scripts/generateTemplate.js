const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))
const resolve = (...file) => path.resolve(__dirname, ...file)
const { vueTemplate, entryTemplate } = require('./template')

var tempType = process.argv[2]
if (tempType === 'component') {
  log('输入组件名，生成在components目录下。如：global/button 生成全局组件button:')
} else if (tempType === 'view') {
  log('输入页面组件名，生成在views目录下。如：home/banner 生成home页业务组件banner:')
}

process.stdin.on('data', async chunk => {
  // chunk 是buffer，需要转为string再处理
  const inputName = String(chunk).trim().toString().split('/')
  const componentName = inputName[inputName.length - 1]

  // 定义组件的路径
  const componentDir = tempType === 'component'
    ? resolve('../src/components', ...inputName)
    : resolve('../src/views', ...inputName)
  const componentVuePath = resolve(componentDir, 'main.vue')
  const componentEntryPath = resolve(componentDir, 'index.js')

  // 生成目录
  if (fs.existsSync(componentDir)) {
    errorLog('组件已存在，请重试!')
    return
  } else {
    log(`正在生成目录 ${componentDir}`)
    await dirCreate(componentDir)
  }

  // 生成文件
  try {
    log(`正在生成vue文件 ${componentVuePath}`)
    await generateFile(componentVuePath, vueTemplate(componentName))
    log(`正在生成entry文件 ${componentEntryPath}`)
    await generateFile(componentEntryPath, entryTemplate)
    successLog('生成完成')
  } catch (e) {
    errorLog(e.message)
  }

  process.stdin.emit('end')
})
process.stdin.on('end', () => {
  log('exit')
  process.exit()
})

// 新建文件
function generateFile (path, data) {
  if (fs.existsSync(path)) {
    errorLog(`${path} 已存在，请重试！`)
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

// 递归创建目录
function mkdirs (dir, cb) {
  if (fs.existsSync(dir)) {
    cb()
  } else {
    const parentDir = path.dirname(dir)
    mkdirs(parentDir, function () {
      fs.mkdirSync(dir)
      cb()
    })
  }
}

function dirCreate (dir) {
  return new Promise(resolve => {
    mkdirs(dir, () => resolve(true))
  })
}
