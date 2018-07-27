const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: [path.resolve(__dirname, 'dist')],
    hot: true,
    compress: true,
    host: '0.0.0.0',
    port: 3001
  },
  resolve: {
    alias: {
      appSrc: path.resolve(__dirname, 'src')
    },
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    modules: [path.resolve('src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: { loader: 'babel-loader' }
      }, {
        test: /\.html$/,
        use: [{ loader: 'html-loader', options: { minimize: true } }]
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          { loader: 'postcss-loader', options: { sourceMap: false } }
        ]
      }, {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          { loader: 'postcss-loader', options: { sourceMap: false } },
          { loader: 'less-loader', options: { sourceMap: false } }
        ]
      }, {
        test: /\.(jpg|jpeg|png|svg|gif|cur|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name][hash:8].[ext]'
            }
          }
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          chunks: 'initial'
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          minChunks: 2,
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } }, // 移除所有注释
        canPrint: true // 是否向控制台打印消息
      })]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
    new HtmlWebPackPlugin({ template: path.resolve(__dirname, 'public/index.html'), filename: 'index.html', hash: true }),
    new CopyWebpackPlugin([{ from: `${__dirname}/public` }])
  ]
};
