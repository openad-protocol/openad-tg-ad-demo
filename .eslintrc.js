module.exports = {
  root: true,
  globals: {
    process: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    ecmaVersion: 12,
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
  },
  plugins: ['babel', 'prettier', 'vue'],
  extends: ['plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended'],
  rules: {
    'vue/comment-directive': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: 5, //标签超出5个属性就会换行
    }],
    'vue/script-setup-uses-vars': 'error', // setup 语法糖校验
    'object-curly-spacing': ['error', 'always'], // 对象前后要加空格 { a: 1 }
    'array-bracket-newline': ['error', { 'minItems': 5 }], // 数组超过五个值可以换行
    'arrow-spacing': 'error', //箭头函数前后加空格 () => {}
    // 'vue/no-unsupported-features': ['error', { // 校验不支持的特性
    //   'version': "^3.0.0",
    //   'ignores': [],
    // }]
    'vue/block-tag-newline': ['error', { //  标签直接的换行规范
      'singleline': 'always',
      'multiline': 'always',
      'maxEmptyLines': 0,
      'blocks': {
        'script': {
          'singleline': 'always',
          'multiline': 'always',
          'maxEmptyLines': 0,
        },
        'template': {
          'singleline': 'always',
          'multiline': 'always',
          'maxEmptyLines': 0,
        },
        'my-block': {
          'singleline': 'always',
          'multiline': 'always',
          'maxEmptyLines': 0,
        },
      },
    }],
    'curly': 'error',
    'default-case': 'error',
    'no-multi-spaces': ['error', { 'ignoreEOLComments': true }],
    'no-unmodified-loop-condition': 'error',
    'no-use-before-define': 'error',
    'indent': ['error', 2],
    'no-unneeded-ternary': 'error',
    'quotes': ['error', 'single'],
    'space-unary-ops': 'error',
    'jsx-quotes': ['error', 'prefer-single'],
    'key-spacing': 'error',
    'brace-style': 'error',
    'camelcase': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'max-lines': ['error', { 'max': 1000, 'skipComments': true }],
    'no-var': 'error',
    'vue/html-indent': ['error', 2],
  },
};