const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const path = require('path');


module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: [path.resolve(__dirname, 'dist')],
    hot: true,
    compress: true,
    // open: true,
    host: '0.0.0.0',
    port: 3000
  },
  resolve: {
    alias: {
      appSrc: path.resolve(__dirname, 'src')
    },
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    modules: ['node_modules']
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
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { javascriptEnabled: true, sourceMap: true, minimize: false }
          }, {
            loader: 'postcss-loader',
            options: { javascriptEnabled: true, sourceMap: true }
          }, {
            loader: 'less-loader',
            options: { javascriptEnabled: true, sourceMap: true }
          }
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
    }
  },
  plugins: [
    new HtmlWebPackPlugin({ template: path.resolve(__dirname, 'public/index.html'), filename: 'index.html' }),
    new CopyWebpackPlugin([{ from: `${__dirname}/public` }]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
    // new BundleAnalyzerPlugin()
  ]
};
