const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash'); 
const ImageWebpackLoader = require("image-webpack-loader");
const FileLoader = require("file-loader");// добавили плагин
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// подключаем плагин
const isDev = process.env.NODE_ENV === 'development';
// создаем переменную для development-сборки

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
// указали путь к файлу, в квадратных скобках куда вставлять сгенерированный хеш
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      /*{
        test: /\.css$/,
        use:  [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
       },*/
      {
        test: /\.(png|jpg|gif|ico|svg)$/,//мои изменения
        use: [
                'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
                {
                        loader: 'image-webpack-loader',
                        options: {}
                },
              ]
      },
      {
        test: /\.css$/i,
        use: [
                        (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                        'css-loader', 
                        'postcss-loader'
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
      }
        ]
      },
  plugins: [ 
    new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
              preset: ['default'],
      },
      canPrint: true
    }),
    /*new ImageWebpackLoader({//мои изменения
      filename: 'style.[contenthash].css'
    }),
  new FileLoader({//мои изменения
    filename: 'style.[contenthash].css'
    }),*/
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash(
    ), 
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
  ]
};