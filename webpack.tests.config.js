const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require("path");

module.exports = {
    entry: 'mocha!./test/index.js',
    output: {
        filename: 'assets/js/[name].test.bundle.js',
        path: path.resolve(__dirname,'test/')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(css|scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader!postcss-loader'
                }),
            },
            {
                test: /\.(jpe?g|png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '../images/[name].[ext]'
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "test"),
        hot: true,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Mocha test Runner',
            hash: true,
            template: './src/index.html'
        }),
        new ExtractTextPlugin('assets/css/[name].css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer]
            }
        })
    ]
};