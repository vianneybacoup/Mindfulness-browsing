module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.tx', '.tsx']
      },
      alias: {
        map: [
          ['@overlay', './src/overlay'],
          ['@popup', './src/popup'],
          ['@background', './src/static/background'],
          ['@content', './src/static/content.ts'],
        ],
        extensions: ['.ts', '.tsx']
      }
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
}
