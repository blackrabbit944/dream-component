//webpack.prod.js
var path = require('path');
var webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.js');
var path = require('path');

const basePath = path.resolve(__dirname, './');

module.exports = merge(webpackBaseConfig, {
    mode: 'production',

    entry: {
        button: path.resolve(basePath, `./src/button/index.tsx`),
        message: path.resolve(basePath, `./src/message/index.tsx`),
        modal: path.resolve(basePath, `./src/modal/index.tsx`)
    },
    output: {
        // filename指定为一个方法可以拿到chunk.name，分别是'button1'和'button2'
        // filename最终的结果 => 'button1/index.js'
        filename: (pathData) => {
            console.log('pathData', pathData);
            return `${pathData.chunk.name}/index.js`;
        },
        // 输出到根目录的 lib文件夹下面
        // 最终的路径就是 path + filename => '../lib/button/index.js', 如此js可以按照源文件路径输出了
        path: path.resolve(basePath, './lib'),
        libraryTarget: 'umd',
        library: '[name]',
        libraryExport: 'default'
    },
    externals: {
        react: 'react',
        'react-dom': 'ReactDOM'
    }
});
