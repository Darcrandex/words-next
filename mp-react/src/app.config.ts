export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/category/index',
    'pages/mine/index',
    'pages/paragraph-center/index',
    'pages/paragraph-detail/index',

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
        text: '',
        iconPath: 'assets/icons/tab-home.png',
        selectedIconPath: 'assets/icons/tab-home-active.png'
      },
      {
        pagePath: 'pages/category/index',
        text: '',
        iconPath: 'assets/icons/tab-home.png',
        selectedIconPath: 'assets/icons/tab-home-active.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '',
        iconPath: 'assets/icons/tab-mine.png',
        selectedIconPath: 'assets/icons/tab-mine-active.png'
      }
    ]
  }
})
