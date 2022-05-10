const path = require('path')
const getEnv = require('./get-env')

const config = {
  projectName: 'mp-react',
  date: '2022-2-9',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },

  // 1.路径别名
  alias: { '@': path.resolve(__dirname, '..', 'src') },

  sourceRoot: 'src',
  outputRoot: 'dist',

  plugins: [
    // 允许使用 html 标签
    '@tarojs/plugin-html',
    // 使用 tailwind 插件
    'taro-plugin-tailwind',
    // 全局 less 变量/mixins
    [
      'taro-plugin-style-resource',
      {
        less: {
          patterns: [path.resolve(__dirname, '..', 'src/styles/variables.less')]
        }
      }
    ]
  ],

  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  framework: 'react',
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
  // 2. 自定义 env 获取
  return merge({}, config, { env: getEnv() })
}
