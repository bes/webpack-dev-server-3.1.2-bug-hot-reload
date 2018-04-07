const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env) => {
  // Setup paths
  const baseDir = path.join(__dirname, '..', 'app');
  const nodeModulesPath = path.join(baseDir, '..', 'node_modules');
  const srcPath = path.join(baseDir, 'src/main/js');
  const destPath = path.join(baseDir, 'build/webpack/js');

  const entry = {
    main: [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.join(srcPath, 'main.js'),
    ],
  };

  Object.keys(entry).forEach(function hot(entryKey) {
    const entryItem = entry[entryKey];
    entryItem.unshift('webpack/hot/only-dev-server');
    entryItem.unshift('webpack-dev-server/client?http://localhost:8081');
  });

  const module = {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: [{ loader: 'babel-loader', query: { cacheDirectory: true } }],
      },
    ],
  };

  module.rules.push(
    {
      test: /\.module\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { modules: true, importLoaders: 1, localIdentName: "[name]__[local]__[hash:base64:5]" }
        },
        { loader: 'less-loader' },
      ],
    },
  );

  const plugins = [
    // new BundleAnalyzerPlugin(),
    new webpack.ProvidePlugin({
      Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise', // Promise Polyfill
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch', // Fetch Polyfill
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ];

  plugins.push(new webpack.HotModuleReplacementPlugin());

  const optimization = {
    splitChunks: {
      name: true,
      chunks: "all",
    },
  };

  return {
    target: 'web',
    mode: 'development',
    entry: entry,
    resolve: {
      extensions: ['.js', '.tsx', '.ts'],
      modules: [srcPath, nodeModulesPath, 'src/main/js'],
    },
    resolveLoader: {
      modules: [nodeModulesPath],
    },
    output: {
      path: destPath,
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    module: module,
    plugins: plugins,
    devtool: 'source-map',
    optimization: optimization,
  };
};
