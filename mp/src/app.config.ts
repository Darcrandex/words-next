export default {
  pages: ['pages/Home/index', 'pages/Paragraph/index', 'pages/Mine/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },

  tabBar: {
    list: [
      {
        pagePath: 'pages/Home/index',
        text: '',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home-fill.png'
      },
      {
        pagePath: 'pages/Mine/index',
        text: '',
        iconPath: 'assets/icons/account.png',
        selectedIconPath: 'assets/icons/account-fill.png'
      }
    ]
  }
}
