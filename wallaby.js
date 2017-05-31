/* eslint strict:off, global-require:off */

'use strict';

module.exports = wallaby => {
    return {
        files: [
            'src/**/*.js',
            'src/**/*.snap',
            'jest.config.js',
            '.env',
            '!src/**/*.test.js',
        ],

        tests: ['src/**/*.test.js'],

        compilers: {
            '**/*.js': wallaby.compilers.babel(),
        },

        env: {
            type: 'node',
            runner: 'node',
        },

        testFramework: 'jest',

        // https://github.com/wallabyjs/public/issues/465
        workers: { initial: 1, regular: 1 },

        setup: w => {
            const jestConfig = require('./jest.config');
            w.testFramework.configure(jestConfig);
        },
    };
};
