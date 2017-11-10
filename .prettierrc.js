'use strict';

module.exports = {
    semi: true,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'all',
    overrides: [
        /**
         * Node 6 does not allow trailing function commas
         *
         * es5 trailing for all root files
         */
        {
            files: '*.js',
            excludeFiles: '*/**',
            options: {
                trailingComma: 'es5',
            },
        },
    ],
};
