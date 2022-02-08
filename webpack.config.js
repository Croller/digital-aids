require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressPlugin = require("progress-webpack-plugin");
// const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
// const SizePlugin = require("size-plugin");
// const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = function config(env, { mode }) {
  const isProduction = mode === "production";
  console.log("env: ", env);
  console.log("mode: ", mode);

  return {
    entry: './src/client/index.tsx',
    module: {
      rules: [
        {
          test: /.([j|t]sx?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env"],
                  ["@babel/preset-react", { runtime: "automatic" }],
                  ["@babel/preset-typescript"],
                ],
                plugins: [
                  // [
                  //   "import",
                  //   {
                  //     libraryName: "antd",
                  //     libraryDirectory: "es",
                  //     style: "css",
                  //   },
                  // ],
                  // ["@babel/plugin-proposal-class-properties", { loose: true }],
                  // ["@babel/plugin-proposal-private-methods", { loose: true }],
                  // [
                  //   "@babel/plugin-proposal-private-property-in-object",
                  //   { loose: true },
                  // ],
                  ["@babel/plugin-transform-runtime"],
                  // !isProduction && require.resolve("react-refresh/babel"),
                ].filter(Boolean),
              },
            },
          ],
        },

        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    isProduction &&
                      require("cssnano")({
                        preset: [
                          "default",
                          { discardComments: { removeAll: true } },
                        ],
                      }),
                  ].filter(Boolean),
                },
              },
            },
            "sass-loader",
          ],
        },

        // {
        //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
        //   include: path.resolve(__dirname, "src/client/assets/images"),
        //   type: "asset/resource",
        // },
        // {
        //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
        //   include: path.resolve(__dirname, "src/client/assets/fonts"),
        //   type: "asset/resource",
        // },
        // {
        //   test: /\.svg$/,
        //   include: path.resolve(__dirname, "src/client/assets/icons"),
        //   use: [
        //     {
        //       loader: "svg-sprite-loader",
        //       options: {
        //         symbolId: "[name]",
        //       },
        //     },
        //     "svgo-loader",
        //   ],
        // },
        // {
        //   test: /.html$/,
        //   use: ["html-loader"],
        // },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        client: path.resolve(__dirname, 'src/client'),
        server: path.resolve(__dirname, 'src/server'),
      },
    },
    cache: {
      type: "filesystem",
    },
    output: {
      clean: true,
      filename: "[name].[chunkhash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    devServer: {
      host: '0.0.0.0',
      port: process.env.LOCAL_CLIENT_PORT,
      hot: true,
      historyApiFallback: true,
      client: {
        overlay: false,
      },
      static: {
        directory: path.join(__dirname, "public"),
      },
      proxy: {
        ...['/api', '/static', '/socket.io'].reduce((obj, key) => ({
          ...obj,
          [key]: `http://0.0.0.0:${process.env.LOCAL_SERVER_PORT}`,
        }), {}),
        secure: false,
        changeOrigin: false,
      },
    },
    plugins: [
      new ProgressPlugin(),
      new Dotenv({ path: './.env' }),
      // isProduction && new SizePlugin({}),
      // !isProduction && new ReactRefreshWebpackPlugin(),
      // new SpriteLoaderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
        inject: "body",
      }),
    ].filter(Boolean),
    devtool: 'eval-source-map',
  }
}
