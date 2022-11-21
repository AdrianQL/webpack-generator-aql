const javascriptSettings = {
  files: ['*.js'],
  extends: ['standard', 'plugin:jest/recommended'],
  rules: {
    'no-else-return': ['error', { allowElseIf: false }],
    'space-before-function-paren': ['error', 'never'],
    semi: ['error', 'always'],
    'no-extra-semi': 'error'
  }
};

module.exports = {
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 8
  },
  overrides: [javascriptSettings]
};
