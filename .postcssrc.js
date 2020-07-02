module.exports = {
  plugins: {
    // vueCLI 内部已经集成了 autoprefixer 插件 注释以避免冲突
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // rootValue: 37.5,
      // vant 的样式就设置为37.5
      // 自己写的样式就设置为设计稿的10分之1  因为 amfe-flexible 组件是将页面适配分成10份
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],
      exclude: 'github-markdown'
    }
  }
}
