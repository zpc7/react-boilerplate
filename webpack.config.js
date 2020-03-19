const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const tsImportPluginFactory = require('ts-import-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: "development",
  entry: "./src/app.tsx",
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    compress: true,
    historyApiFallback: true,
    // open: true,
    host: '0.0.0.0',
    port: 8000
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [tsImportPluginFactory([
                {
                  libraryName: 'antd',
                  libraryDirectory: 'lib',
                  style: true
                }, {
                  style: false,
                  libraryName: 'lodash',
                  libraryDirectory: null,
                  camel2DashComponentName: false
                }
              ])]
            }),
            compilerOptions: {
              module: 'es2015'
            }
          }
        }]
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'less-loader',
            options: { javascriptEnabled: true, sourceMap: true }
          }]
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html'
    }),
    // new BundleAnalyzerPlugin()
  ]
};
