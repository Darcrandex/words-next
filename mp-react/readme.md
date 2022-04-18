> 由于目前 tarojs 对 vue3 的支持还有很多问题，选择 react

## alias

`config/index.js`

```js
{ "alias": { "@": path.resolve(__dirname, "..", "src") } }
```

`tsconfig.json`

```json
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"]
  }
}
```

## 自定义 env

> 由于开发过程中，编译的包会很大，为了方便调试，把 NODE_ENV 设置为 production。但同时会因此影响正常的 dev 模式。因此使用一个额外的自定义变量 MODE 来表示运行模式。并且使用 env 文件来配置环境变量。

```bash
yarn add dotenv -D
```

修改启动命令 package.json

```json
{
  "script": { "dev": "NODE_ENV=production MODE=development npm run build:weapp -- --watch" }
}
```

获取 env `config/get-env.js`；修改配置(config/index.js)

```js
module.exports = function(merge) {
  // 2. 自定义 env 获取
  return merge({}, config, { env: getEnv() })
}
```

## 封装请求函数

```bash
yarn add query-string
```

新增文件 `src/utils/http.ts`

## 使用 tailwindcss

[taro-plugin-tailwind](https://github.com/pcdotfan/taro-plugin-tailwind)

## 使用 recoil

[Recoil](https://recoiljs.org/docs/introduction/getting-started)

## 允许使用 html 标签

使用 html 的语义标签比较方便理解内容结构
[@tarojs/plugin-html](https://taro-docs.jd.com/taro/docs/use-h5/)

## 使用 iconfont 字体图标

[参考文章](https://www.duoguyu.com/smart/42.html)

## 自定义底部 tabbar

先按照官方文档：[自定义 tabBar](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html) 完成配置.

然后把这个组件的内容清空，只保留一个 `<view></view>`。这样 tabBar 依然可以生效，只是没有按钮可以点击。
然后我们自己封装一个 tabBar 按钮组件（`/src/containers/BottomTabNavs/index.tsx`），把它放到没一个 tab 级别的业务组件，通过这个组件来触发切换 tab 的功能。

## 小程序图片限制

使用图片时有以下情况：

1. Image + 本地资源
2. Image + 网络资源
3. backgroundImage + 本地资源 失效
4. backgroundImage + 网络资源
