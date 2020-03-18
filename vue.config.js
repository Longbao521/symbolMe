const CopyWebpackPlugin = require('copy-webpack-plugin'); // 该插件作用是复制一份文件到dist目录下
const webpack = require('webpack'); // webpack
const path = require('path');// nodeJs的path模块

//判断环境模式
const is_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

const debug = process.env.NODE_ENV !== 'production';

// 定义cesium引用资源路径
let cesiumSource = './node_modules/cesium/Source';
let cesiumWorkers = '../Build/Cesium/Workers';

//export
module.exports = {
    publicPath: is_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./",
    devServer: {
        port: 3001,
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:12000', //API服务器的地址
        //         ws: true,  //代理websockets
        //         changeOrigin: true, // 虚拟的站点需要更管origin
        //         pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
        //             '^/api': ''
        //         }
        //     }
        // }
    },
    configureWebpack: {
        output: {
            sourcePrefix: ' ' // 让webpack 正确处理多行字符串配置 amd参数
        },
        amd: { // 2
            toUrlUndefined: true
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve('src'),
                'cesium': path.resolve(__dirname, cesiumSource) // 3
            }
        },
        plugins: [ // 4
            new CopyWebpackPlugin([ { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers'}]),
            new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Assets'), to: 'Assets'}]),
            new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets'}]),
            new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers'}]),
            new webpack.DefinePlugin({ // 5
                CESIUM_BASE_URL: JSON.stringify('./')
            })
        ],
        module: {
            unknownContextCritical: /^.\/.*$/,
            unknownContextCritical: false // 6
        }/*,
        build :{
            assetsPublicPath: "./"
        }*/
    }
}
