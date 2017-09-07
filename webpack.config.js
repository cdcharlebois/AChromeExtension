const path = require('path');

module.exports = {
    entry: {
        'dist/bundle-content': './src/content.js',
        'dist/bundle-background': './src/background.js',
        'dist/bundle-popup': './src/popup.js',
        'dist/bundle-inject': './src/inject.js'
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