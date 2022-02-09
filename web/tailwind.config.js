// 通过 `vue add tailwind` 安装的是 2.x 的，目前 `vue-cli` 还不支持 `tailwindcss@3.x`
module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
