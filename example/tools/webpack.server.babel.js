import path from 'path';
import webpack from 'webpack';
import NodeExternals from 'webpack-node-externals';

const projectRoot = path.resolve(process.cwd(), 'example');
const nodeModules = new NodeExternals();

const server = {
    context: projectRoot,
    devtool: 'source-map',
    target: 'node',
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
    externals: [nodeModules],

    entry: {
        main: ['./src/server.js'],
    },

    output: {
        path: path.resolve(projectRoot, 'build/'),
        filename: 'server.js',
        chunkFilename: 'server-[name]-[chunkhash].js',
        libraryTarget: 'commonjs2',
        publicPath: '/dist/',
    },

    resolve: {
        modules: [path.resolve(projectRoot, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx'],
    },

    module: {
        rules: [
            {
                test: /\.jsx?$|.js.flow$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            babelrc: false,
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
                            plugins: ['transform-object-rest-spread'],
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new webpack.BannerPlugin({
            banner: "require('source-map-support').install();",
            raw: true,
            entryOnly: false,
        }),

        new webpack.DefinePlugin({
            __CLIENT__: false,
            __SERVER__: true,
        }),
    ],
};

export default server;
