//webpack.base.js
var path = require('path');
var webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: (pathData) => {
                return `${pathData.chunk.name}/style/index.css`;
            }
        })
    ]
};

if (process.env.npm_config_report) {
    module.exports.plugins = (module.exports.plugins || []).concat([new BundleAnalyzerPlugin()]);
}
