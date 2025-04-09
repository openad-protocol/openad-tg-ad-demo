const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const webpack = require('webpack');
const envConfig = require('../config/env.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BuildENV = envConfig.getBuildENV({
  NODE_ENV: '"development"',
  prod: '"dev"',
});
const os = require('os');

const interfaces = os.networkInterfaces();
let localIpAddress;
Object.keys(interfaces).forEach((interfaceName) => {
  interfaces[interfaceName].forEach((interfaceData) => {
    if (interfaceData.family === 'IPv4' && !interfaceData.internal) {
      localIpAddress = interfaceData.address;
    }
  });
});

module.exports = (RESETENV) => {
  let DEVConf;
  DEVConf = {
    devtool: 'inline-source-map',
    mode: 'development',
    cache: {
      type: 'filesystem',
    },
    devServer: {
      host: BuildENV.host,
      port: BuildENV.port && Number(BuildENV.port),
      hot: true,
      // inline: true,
      server: BuildENV.server,
      client: {
        reconnect: false,
        progress: false,
        overlay: false,
        //overlay: {
        //    errors: true,
        //    warnings: false,
        //}
      },
      proxy: [{
        context: ['/apis'],
        target: BuildENV.apiURL,
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/apis': '/apis' },
      }],
      allowedHosts: 'all',
    },
    module: {
      rules: [{
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader',
          'css-loader',
          'sass-loader'],
      },
      {
        test: /\.less$/i,
        // eslint-disable-next-line array-bracket-newline
        use: [
          'style-loader',
          'css-loader',
          'less-loader'],
      }],
    },
    // eslint-disable-next-line array-bracket-newline
    plugins: [
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
        vConsole: false,
        prod: false,
        staticURL: BuildENV.staticURL,
        webURL: BuildENV.webURL,
        keywords: BuildENV.keywords,
        description: BuildENV.description,
      }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`You application is running here ${BuildENV.server}://${localIpAddress}:${BuildENV.port}`,
            `You can also open local address ${BuildENV.server}://localhost:${BuildENV.port}`],
        },
        clearConsole: true,
        // eslint-disable-next-line no-unused-vars
        onErrors(severity, errors) { },
      }),
      new webpack.DefinePlugin({
        'process.env': envConfig.getNodeENV({
          NODE_ENV: '"development"',
          prod: '"dev"',
        }),
      })],
  };

  return merge(common(RESETENV), DEVConf);
};
