require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const outputDirectory = 'dist';
const PLATFORM = process.env.NODE_ENV;
let optimization = {};
let entry;
let plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new Dotenv({ path: './.env' }),
  new HtmlWebpackPlugin({
    template: './public/index.html',
    favicon: './public/favicon.ico',
  }),
  new CopyWebpackPlugin({
    patterns: [{
      from: path.resolve(__dirname, 'src/client/assets/fonts'),
      to: './fonts',
    }],
  }),
];

if (PLATFORM === 'production') {
  entry = ['./src/client/index.js'];
  plugins = plugins.concat(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'css/[name].[hash].css' }),
  );
  optimization = {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        extractComments: false,
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  };
}

if (PLATFORM === 'development') {
  entry = [
    'babel-polyfill',
    'react-hot-loader/patch',
    './src/client/index.js',
  ];
  // plugins = plugins.concat(
  //   new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerMode: 'static' }),
  // );
}

module.exports = {
  entry,
  plugins,
  devtool: '',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'js/[name].[hash].js',
    publicPath: '/',
    chunkFilename: 'js/[name].[chunkhash].js',
  },
  optimization: {
    ...optimization,
    chunkIds: 'named',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?css$/,
        use: [
          PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                floatPrecision: 2,
                plugins: [{ removeTitle: false }],
              },
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
          },
        }],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    fallback: { fs: false },
    alias: {
      'react-dom': '@hot-loader/react-dom',
      client: path.resolve(__dirname, 'src/client'),
      server: path.resolve(__dirname, 'src/server'),
    },
  },
  devServer: {
    // publicPath: '/',
    host: '0.0.0.0',
    // contentBase: './',
    port: process.env.LOCAL_CLIENT_PORT,
    hot: 'only',
    open: false,
    historyApiFallback: true,
    proxy: {
      secure: false,
      changeOrigin: false,
      ...['/api', '/static', '/socket.io'].reduce((obj, key) => ({
        ...obj,
        [key]: `http://0.0.0.0:${process.env.LOCAL_SERVER_PORT}`,
      }), {}),
    },
  },
};
