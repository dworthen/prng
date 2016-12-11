var webpack = require('webpack');
var argv = require('yargs').argv;

module.exports = {
    context: __dirname,
    devtool: argv.hot ? "#eval" : "#source-map",
    entry: './src/index.js',
    output: {
        filename: './app.min.js',
        library: 'PRNG',
        libraryTarget: 'var'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['latest']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?mimetype=application/font-woff"
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?mimetype=application/vnd.ms-fontobject"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?mimetype=image/svg+xml"
            }
        ],
    }
};