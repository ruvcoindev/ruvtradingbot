module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    // Основные правила
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'no-unused-vars': ['warn', { args: 'none' }],
    
    // Импорты
    'import/no-unresolved': 'error',
    'import/order': ['warn', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      pathGroups: [{
        pattern: '{react,react-native}',
        group: 'external',
        position: 'before'
      }],
      pathGroupsExcludedImportTypes: ['react'],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true
      }
    }],
    
    // TypeScript
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    
    // Асинхронность
    'prefer-promise-reject-errors': 'off',
    'no-async-promise-executor': 'warn',
    
    // Стиль
    'prefer-arrow-callback': 'warn',
    'object-shorthand': 'warn',
    'quote-props': ['warn', 'as-needed'],
    'lines-between-class-members': ['warn', 'always'],
    
    // Импорт/экспорт
    'import/no-duplicates': 'warn',
    'no-duplicate-imports': 'warn',
    'import/no-named-as-default': 'warn',
    'import/no-named-as-default-member': 'warn',
    'import/no-unassigned-import': 'warn',
    'import/no-unused-modules': 'warn',
    
    // Дополнительно
    'prefer-spread': 'warn',
    'prefer-rest-params': 'warn',
    'no-prototype-builtins': 'warn'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json']
      }
    }
  }
};
