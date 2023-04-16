const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = {
    entry: './src/assets/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './assets/js/index.bundle.js',
        assetModuleFilename: './assets/[base]', // or => assetModuleFilename: './assets/uploads/[name][ext]'
        clean: true,
    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        port: 8080,
        open: true,
        compress: true,
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                // options: {
                //     minimize: true, // html minify method 01
                // },
            },
            {
                test: /\.css$/,
                // include: path.resolve(__dirname, 'src'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name][ext]',
                },
            },
            {
                test: /\.(mp4|webm|wmv)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/video/[name][ext]',
                },
            },
        ],
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin()],
        minimize: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true, // html minify method 02
                removeComments: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: './assets/css/style.bundle.css',
            chunkFilename: './css/[id].css',
        }),
    ],
};

module.exports = config;
