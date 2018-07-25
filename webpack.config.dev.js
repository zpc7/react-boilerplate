const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      }, {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
        // use: [MiniCssExtractPlugin.loader, "style-loader","css-loader"]
      }, {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader",
            options: {
              javascriptEnabled: true,
              minimize: false,
              sourceMap: true
            }
          }, {
            loader: "postcss-loader",
            options: {
              javascriptEnabled: true,
              sourceMap: true
            }
          }, {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              sourceMap: true
            }
          }
        ]
      }, {
        test: /\.(jpg|jpeg|png|svg|gif|cur|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name][hash:8].[ext]" //遇到图片  生成一个images文件夹  名字.后缀的图片
            }
          }
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({template: "./public/index.html", filename: "./index.html"}),
    // new MiniCssExtractPlugin({filename: "[name].css", chunkFilename: "[id].css"}),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/public'
      }
    ])
  ]
}
