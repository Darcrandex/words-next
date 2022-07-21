export default defineAppConfig({
  pages: [
    // tabs
    'pages/home/index',
    'pages/market/index',
    'pages/mine/index',

    // 递进的详情页面
    'pages/author/index',
    'pages/resource/index',
    'pages/tag/index',
    'pages/paragraph/index',

    'pages/search-result/index',

    // 从 我的 tab进入的页面
    'pages/about/index',
    'pages/collection/index',
    'pages/medal/index',
    'pages/my-words/index',
    'pages/settings/index'
  ],

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Words',
    navigationBarTextStyle: 'black'
  },

  tabBar: {
    custom: true,
    color: '#000000',
    selectedColor: '#000000',
    backgroundColor: '#000000',

    list: [
      {
        pagePath: 'pages/home/index',
        text: ''
      },
      {
        pagePath: 'pages/market/index',
        text: ''
      },
      {
        pagePath: 'pages/mine/index',
        text: ''
      }
    ]
  }
})
