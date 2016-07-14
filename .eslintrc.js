module.exports = {
  extends: 'eslint:recommended',
  env: {
    browser: true,
    node: true
  },
  globals: {
    require: true,
    module: true
  },
  rules: {
    'no-cond-assign': [0],
    'no-multiple-empty-lines': [1, {
      max: 1
    }],
    'one-var': ['error', 'never'],
    indent: [
      'warn',
      2
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ]
  }
};
