const webpack = require('webpack');
const path = require('path');

const rootPath = path.join(__dirname, '..', 'src');

module.exports = {
    devtool: 'eval',
    context: path.join(rootPath, 'app'),
    entry: path.join(rootPath, 'app', 'js', 'index.js'),

    output: {
        filename: './public/js/app.js'
    },

    resolve: {
        extensions: ['.js', '.vue', '.scss'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },

            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },

            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                options: {
                    presets: ['env']
                }
            }
        ]
    }
}
