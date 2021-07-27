const path = require('path');
const glob = require("glob");
const BomPlugin = require('webpack-utf8-bom');

const entries = Object.fromEntries(glob.sync("./src/apps/*.ts")
    .map((key) => {
        return [path.basename(key, path.extname(key)), path.resolve(__dirname, key)];
    }))

module.exports = {
    //mode: 'development',
    target: 'es3',
    context: __dirname + "/",
    entry: entries,
    output: {
        filename: '[name].jsx',
        path: path.resolve(__dirname, 'dist'),
    },
    //devtool: 'inline-source-map',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', 'jsx', '.js'],
    },
    plugins: [
        new BomPlugin(true, /\.(tsx|ts|jsx|js|map)$/),
    ],
    optimization: {
        minimize: true,
    },
};