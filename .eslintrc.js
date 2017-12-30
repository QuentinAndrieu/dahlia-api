module.exports = {
    parser: 'babel-eslint',
    extends: [
      'dahlia-api',
      'plugin:flowtype/recommended',
    ],
    plugins: [
      'import',
      'flowtype',
    ],
    env: {
      node: true,
    },
  };