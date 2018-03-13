const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const staticPath = path.resolve(__dirname, './public')

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: './src/index.tsx',

    output: {
        filename: '[name].[hash].js',
        path: staticPath,
        publicPath: '/',
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ],
    },
    stats: {
        colors: true,
    },

    resolve: {
        extensions: [
            '.js', '.jsx', '.json', '.ts', '.tsx',
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.template.html'),
            inject: 'body',
        }),
        // injects everything to html template
    ],

    devServer: {
        host: 'localhost',
        port: 3001,
        contentBase: [staticPath],

        historyApiFallback: true,
        // respond to 404s with index.html

        // hot: true,
        // enable HMR on the server
    },

}
