const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      }, {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }, {
        test: /\.(jpg|jpeg|png|gif|cur|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name][hash:8].[ext]' // 遇到图片  生成一个images文件夹  名字.后缀的图片
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new HtmlWebPackPlugin({ template: './public/index.html', filename: './index.html' }),
    new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css' }),
    new CopyWebpackPlugin([
      {
        from: `${__dirname}/public`
      }
    ])
  ]
};
