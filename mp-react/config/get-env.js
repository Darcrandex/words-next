/**
 * @description 通过 env 文件获取环境变量，而不是惡心心的 config
 */

const path = require('path')
const dotenv = require('dotenv')

module.exports = function() {
  const envMode = process.env.MODE || 'production'
  // 允許的 env 配置文件，會從低到高的優先級合併
  const paths = ['.env', '.env.production', '.env.development', '.env.production.local', '.env.development.local']

  const envs = paths
    .filter(p => {
      const [, , mode] = p.split('.')
      return !mode || mode === envMode
    })
    .map(p => dotenv.config({ path: path.resolve(__dirname, '..', p) }).parsed || {})
  const mergedEnv = Object.assign({}, ...envs)

  // 轉化為 taro 內部的格式
  // 首先，通過 dotenv 獲取的值都是字符串
  // taro 內部在轉成值的時候，需要使用引號包裹，否則會被當成變量，就報錯了
  const taroEnv = Object.entries(mergedEnv).reduce(
    (obj, [key, value]) =>
      Object.assign(obj, { [key]: Number.isNaN(parseFloat(value)) ? `"${value}"` : parseFloat(value) }),
    {}
  )

  return taroEnv
}
