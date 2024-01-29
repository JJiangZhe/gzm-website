module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true,
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
  presets: [
    [
      '@babel/env',
      {
        targets: {
          edge: '17',
          firefox: '60',
          chrome: '67',
          safari: '11.1',
        },
        useBuiltIns: 'usage',
        corejs: '3.6.4',
      },
    ],
  ],
}
