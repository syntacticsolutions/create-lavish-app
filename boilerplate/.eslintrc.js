module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    ignorePatterns: ['**/webpack/*.js'],
    plugins: ['@typescript-eslint', 'react-hooks'],
    extends: [
      'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
      'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
      'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
      'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    rules: {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  
      // note: this should be re-enabled when I make time clean up the typing
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-types': 'off',
      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      'prettier/prettier': ['error', { singleQuote: true, parser: 'typescript', tabWidth: 2 }],
    },
  };
  