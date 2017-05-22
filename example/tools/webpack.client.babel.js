import path from 'path';
import webpack from 'webpack';

const projectRoot = path.resolve(process.cwd(), 'example');

const client = {
    context: projectRoot,
    target: 'web',
    devtool: 'source-map',

    entry: {
        main: ['./src/client.js'],
    },

    output: {
        path: path.resolve(projectRoot, 'build/public/'),
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash:8].js',
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
                                            uglify: true,
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
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
        }),
    ],
};

export default client;
