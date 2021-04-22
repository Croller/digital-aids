module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: ['plugin:react-hooks/recommended', 'airbnb'],
  settings: {
    'import/resolver': {
      'alias': [
        ['client', './src/client'],
        ['server', './src/server']
       ]
    }
  },
  rules: {
    'class-methods-use-this': [
      'error',
      { exceptMethods: ['render'] },
    ],
    'max-len': 0,
    indent: [
      'error',
      2,
      { SwitchCase: 1 },
    ],
    'no-use-before-define': 0,
    'linebreak-style': 0,
    quotes: [
      'error',
      'single',
    ],
    "semi": [2, "always"],
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'react/jsx-tag-spacing': [
      2, {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],
    'no-multiple-empty-lines': [
      2, {
        max: 1,
      },
    ],
    'arrow-parens': 0,
    'no-nested-ternary': 0,
    'consistent-return': 0,
    'no-trailing-spaces': 0,
    'no-restricted-syntax': [0, 'ForOfStatement'],
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'import/no-unresolved': [0, { ignore: ['./styled'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 0,
    'no-eval': 0,
    'camelcase': 0,
    'no-restricted-globals': 0,
  },
};
