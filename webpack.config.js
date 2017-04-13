const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require("path");


/**
 * Public resources path
 */
const resourcesPath = './dist';

/**
 * The root path to the assets.
 *
 * @type {String}
 */
const sourcePath = './scr';

/**
 * The path where the scripts should be written.
 *
 * @type {String}
 */
const destinationPath = './dist';

const nodePackagesPath =  './node_modules';


module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: 'assets/js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader!postcss-loader'
                }),
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(jpe?g|png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '../images/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {

                        name: '../fonts/[name].[ext]'
                    }
                }
            },
            {
                test: /\.pug$/,
                use: ['pug-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        hot: true,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Crud',
            hash: true,
            template: './src/index.html'
        }),
        new ExtractTextPlugin('assets/css/[name].css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer]
            }
        }),
        new CopyWebpackPlugin([
            { from:  'src/assets/fonts', to:  'assets/fonts', toType: 'dir', force: true },
            { from:  'src/assets/images', to:  'assets/images', toType: 'dir', force: true }
        ])
    ]
};