const { resolve } = require('path')

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        // 把 stylus 变量注入到全局组件中
        import: [resolve(__dirname, 'src/stylus/variables.styl')],
      },
    },
  },
}
