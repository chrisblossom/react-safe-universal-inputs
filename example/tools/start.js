process.env.NODE_ENV = 'development';

import path from 'path';
import webpack from 'webpack';
import nodemon from 'nodemon';
import clientWebpackConfig from './webpack.client.babel';

import serverWebpackConfig from './webpack.server.babel';

import fse from 'fs-extra';

const exampleDir = path.resolve(process.cwd(), 'example/');
const staticDir = path.resolve(exampleDir, 'static');
const buildDir = path.resolve(exampleDir, 'build');
const publicDir = path.resolve(buildDir, 'public');

fse.emptyDirSync(buildDir);
fse.copySync(staticDir, publicDir);

const compiler = webpack([clientWebpackConfig, serverWebpackConfig]);

compiler.watch({}, (err, stats) => {
    console.log(
        `${stats
            .toString({
                version: false,
                assets: false,
                chunks: false,
                colors: true,
                hash: true,
                modules: false,
                reasons: false,
                source: false,
            })
            .replace(/\n/, ' ')}`,
    );
});

const nodeBundler = compiler.compilers.find(compiler => {
    return compiler.options.target === 'node';
});

let started = false;
nodeBundler.plugin('done', () => {
    if (started === false) {
        started = true;

        nodemon({
            script: path.resolve(buildDir, 'server.js'),
            ext: 'js json',
            delay: 500,
            ignore: ['.git', 'node_modules/**/*', '*.test.js'],
            watch: [path.resolve(buildDir, 'server.js')],
        });
    }
});

process.once('SIGTERM', function() {
    process.exit(0);
});

process.once('SIGINT', function() {
    process.exit(0);
});
