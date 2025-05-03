module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'no-unused-vars': ['warn', { args: 'none' }],
    'import/no-unresolved': 'error',
    'no-async-promise-executor': 'warn',
    'prefer-arrow-callback': 'warn',
    'object-shorthand': 'warn',
    'quote-props': ['warn', 'as-needed'],
    'lines-between-class-members': ['warn', 'always']
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json']
      }
    }
  }
};
