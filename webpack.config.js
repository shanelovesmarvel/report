var webpack = require("webpack");

var path = require("path");
var HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: "./src/boot.ts",
        style: "./src/style.ts"
    },
    output: {
        path: root('dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },
    resolve: {
        // ensure loader extensions match
        extensions: ['', '.ts', '.js', '.json', '.css', '.html']
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        port: 3000
    },

    plugins: [
        new HtmlwebpackPlugin({
            title: 'Hello Angular2!',
            template: './src/index.html',
            inject: true
        })
    ],
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts-loader',
            query: {
                'ignoreDiagnostics': [
                    2403, // 2403 -> Subsequent variable declarations
                    2300, // 2300 -> Duplicate identifier
                    2374, // 2374 -> Duplicate number index signature
                    2375 // 2375 -> Duplicate string index signature
                ]
            }
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.(png|jpg|svg)$/,
            loader: 'url-loader?limit=10000&name=build/[name].[ext]'
        }]
    }
};

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}