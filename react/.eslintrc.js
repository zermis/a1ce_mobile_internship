module.exports = {
    env: {
        es6: true,
        node: true,
        jest: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],

    parserOptions: {
        project: './tsconfig.json'
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint'],

    rules: {
        quotes: ['error', 'single', { avoidEscape: true }],
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        'react-hooks/exhaustive-deps': 'off'
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
};
