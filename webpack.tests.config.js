const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require("path");

module.exports = {
    entry: {
        app: './test/index.js'
    },
    output: {
        filename: 'assets/js/[name].test.bundle.js',
        path: path.resolve(__dirname,'webtest/')
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
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "webtest"),
        hot: true,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Mocha test Runner',
            hash: true,
            template: './test/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};