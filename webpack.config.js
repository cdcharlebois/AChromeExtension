const path = require('path');

module.exports = {
    entry: {
        'dist/bundle-content': './src/content.js',
        'dist/bundle-background': './src/background.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '.')
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        ]
    }
};