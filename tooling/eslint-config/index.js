module.exports = {
  extends: [
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-types': 'warn',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
      ],
      plugins: ['@typescript-eslint', 'react', 'react-hooks'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/explicit-function-return-types': 'warn',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ],
};