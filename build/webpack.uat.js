const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const ManifestPlugin = require('webpack-manifest-plugin');
const envConfig = require('../config/env.conf');
const BuildENV = envConfig.getBuildENV({
  NODE_ENV: '"production"',
  prod: '"uat"',
});

module.exports = (RESETENV) => {
  let BuildConfig = {
    target: 'web',
    cache: false,
    mode: 'production',
    // devtool:'source-map',
    output: {
      path: path.resolve(__dirname, `../dist/${BuildENV.sysApp}/${BuildENV.dist}`),
      publicPath: BuildENV.staticURL,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './' + BuildENV.sysApp + '/' + BuildENV.filename,
        filename: 'index.html',
        title: BuildENV.title,
        inject: true,
        timeStamp: new Date().valueOf(),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        },
        vConsole: true,
        prod: true,
        staticURL: BuildENV.staticURL,
        webURL: BuildENV.webURL,
        overlay: false,
      }),
      new webpack.DefinePlugin({
        'process.env': envConfig.getNodeENV({
          NODE_ENV: '"production"',
          prod: '"uat"',
        }),
        'process.env.NODE_ENV': BuildENV.NODE_ENV,
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].style.[chunkhash].css',
        chunkFilename: 'assets/css/[name].[chunkhash].css',
        ignoreOrder: true,
      }),
      new webpack.ProgressPlugin({
        activeModules: false,
        entries: true,
        handler(percentage, message, ...args) {
          console.info(
            `\u001b[A\u001b[K\u001b[33m${(percentage * 100).toFixed(2)}%` +
                        `\t\u001b[0m\u001b[1m${message}\t` +
                        `\u001b[0m\u001b[90m${
                          args && args.length > 0 ? args[0] : ''
                        }\u001b[0m`,
          );
        },
        modules: true,
        modulesCount: 5000,
        profile: false,
        dependencies: true,
        dependenciesCount: 10000,
        percentBy: null,
      }),
    ],
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: path.resolve(__dirname, '../build/clearConsole.js'),
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              modules: {
                auto: false,
                localIdentName: '[local]_[hash:base64:8]',
              },
            },
          }],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      }],
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        parallel: true,
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          ecma: 5,
          parse: {
            'html5_comments': false,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            'drop_debugger': true,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            'ascii_only': true,
            'inline_script': false,
          },
          ie8: true,
          safari10: true,
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
        // eslint-disable-next-line array-bracket-newline
      ],
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
  };

  if (BuildENV && BuildENV.analyzer) {
    BuildConfig.plugins.push(new BundleAnalyzerPlugin());
    //BuildConfig.plugins.push(new ManifestPlugin());
  }

  return merge(common(RESETENV), BuildConfig);
};
