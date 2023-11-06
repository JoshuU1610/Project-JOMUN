module.exports = {
  'env': {
    'browser':true, //para el FrontEnd
    'node': true,
    'es6': true,
  },
  'globals': {
    'process': true,
  },
  'extends': [
    'eslint:recommended'
  ],
  'parserOptions': {
    'ecmaVersion': 2020,
  },
  'rules': {
    'indent':[
      'error',
      2
    ],
    'linebreak-style':[
      'error',
      process.platform === 'win32'
        ? 'windows'
        : 'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing':[
      'error' , 'always'
    ],
    'arrow-spacing':[
      'error', { 'before':true, 'after': true }
    ],
    'no-console': 0,
  },
};