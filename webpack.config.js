var webpack = require('webpack');
var argv = require('yargs').argv;

module.exports = {
    context: __dirname,
    devtool: !argv.commonjs ? (argv.hot ? "#eval" : "#source-map") : undefined,
    entry: './support/js/index.js',
    output: {
        filename: argv.commonjs ? './index.js' : './dist/prng.min.js',
        library: !argv.commonjs ? 'PRNG' : undefined,
        libraryTarget: argv.commonjs ? 'commonjs2' : 'var'
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
            }
        ],
    }
};