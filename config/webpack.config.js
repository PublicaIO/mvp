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
            'vue$': 'vue/dist/vue.esm.js',
            'components': path.join(rootPath, 'app', 'js', 'components'),
            'helpers': path.join(rootPath, 'app', 'js', 'helpers'),
            'routes': path.join(rootPath, 'app', 'js', 'routes'),
            'store': path.join(rootPath, 'app', 'js', 'store'),
            'utils': path.join(rootPath, 'app', 'js', 'utils')
        }
    },

    module: {
        rules: [{
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: [/node_modules/],
                options: {
                    configFile: path.join(__dirname, '..', 'config', 'eslintrc.js')
                }
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },

            {
                test: /\.scss$/,
                use: [{
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
                    presets: [
                        ["env", {
                            targets: {
                                browsers: ["last 2 Chrome versions"]
                            }
                        }]
                    ]
                }
            }
        ]
    }
}