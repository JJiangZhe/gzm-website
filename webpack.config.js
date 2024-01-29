// 解决webstorm无法正确解析vue-cli别名路径问题
// 请手动将 webstorm 设置 -> 语言和框架 —> javascript -> webpack -> 修改为手动， 选择目标文件为该文件即可
module.exports = {
  resolve: {
    alias: {
      '@': require('path').resolve(__dirname, 'src'),
    },
  },
}
