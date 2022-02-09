export default defineAppConfig({
  pages: ['pages/home/index', 'pages/mine/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },

  tabBar: {
    list: [
      {
        pagePath: 'pages/home/index',
        text: 'Home'
      },
      {
        pagePath: 'pages/mine/index',
        text: 'Mine'
      }
    ]
  }
})
