module.exports = {
  extends: 'eslint:recommended',
  env: {
    browser: true
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
    'no-console': ['warn'],
    'one-var': ['warn', 'never'],
    indent: [
      'warn',
      2
    ],
    quotes: [
      'error',
      'single'
    ],
    'no-shadow': ['warn', {
      builtinGlobals: true,
      hoist: 'all',
      allow: ['top', 'parent']
    }],
    semi: [
      'error',
      'always'
    ]
  }
};
