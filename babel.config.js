module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
      },
    ],
  ],
  plugins: [['import', {libraryName: '@ant-design/react-native'}]],
};
