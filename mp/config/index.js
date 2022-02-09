const path = require('path')
const getEnv = require('./get-env')

const config = {
  projectName: 'mp',
  date: '2022-1-8',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },

  // 1.路径别名
  alias: { '@': path.resolve(__dirname, '..', 'src') },

  sourceRoot: 'src',
  outputRoot: 'dist',

  // 2.taro 插件
  // template 中的 html 标签可以自动转成小程序的标签
  // 允许使用 pinia
  // 使用 tailwindcss
  plugins: ['@tarojs/plugin-html', 'taro-plugin-pinia', 'taro-plugin-tailwind'],

  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  framework: 'vue3',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function(merge) {
  return merge({}, config, { env: getEnv() })
}
