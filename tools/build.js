process.env.NODE_ENV = 'production';

import 'babel-polyfill';
import path from 'path';
import fse from 'fs-extra';
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
const pkg = require('../package.json');

const buildDir = path.resolve(process.cwd(), 'dist');
fse.emptyDirSync(buildDir);

const bundles = [
    {
        format: 'cjs',
        ext: '.js',
    },
    {
        format: 'es',
        ext: '.es.js',
    },
];

const build = Promise.all(
    bundles.map(async config => {
        const bundle = await rollup({
            entry: 'src/index.js',
            external: Object.keys(pkg.peerDependencies),
            plugins: [
                babel({
                    babelrc: false,
                    exclude: 'node_modules/**',

                    presets: [
                        [
                            'env',
                            {
                                targets: {
                                    browsers: ['> 0%'],
                                },
                                exclude: ['transform-regenerator'],
                                useBuiltIns: true,
                                modules: false,
                            },
                        ],
                        'react',
                    ],
                    plugins: ['external-helpers', 'transform-object-rest-spread'],
                }),
            ],
        });

        return await bundle.write({
            format: config.format,
            dest: path.resolve(buildDir, `index${config.ext}`),
            sourceMap: true,
        });
    }),
).catch(error => {
    console.error(error);
});

export default build;
