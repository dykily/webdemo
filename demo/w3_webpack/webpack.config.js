

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');//引入webpack
module.exports = {
  mode: "development",
  entry: "./public/script/index.js",
  output: {
    path: __dirname + "/public/dist/",//打包后的文件存放的地方
    filename: "js/[name].js",//打包后输出文件的文件名
    publicPath: "./"
  },
  optimization: {//公共代码
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'common',
                priority: 10,
                chunks: 'all'
            }
        }
    }
},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|axios.min.js)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
            },
          },
          'css-loader',
          'postcss-loader'
        ],
      },
      
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index/index.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: 'css/[name].css',
    }),
  ]
}