process.env.NODE_ENV = 'production';

import path from 'path';
import webpack from 'webpack';

import clientWebpackConfig from './webpack.client.babel';
import serverWebpackConfig from './webpack.server.babel';

import fse from 'fs-extra';

const exampleDir = path.resolve(process.cwd(), 'example/');
const staticDir = path.resolve(exampleDir, 'static');
const buildDir = path.resolve(exampleDir, 'build');
const publicDir = path.resolve(buildDir, 'public');

fse.emptyDirSync(buildDir);
fse.copySync(staticDir, publicDir);

webpack([clientWebpackConfig, serverWebpackConfig]).run((err, stats) => {
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
