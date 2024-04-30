const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('lodash/merge');
const common = require('./webpack.common');
const config = require('./config');
const path = require('path');

const moduleRules = [];

function isLoaderAvailable(loaderName) {
  try {
    require.resolve(loaderName);
    return true;
  } catch (e) {
    return false;
  }
}

// Sass
if (isLoaderAvailable('sass-loader')) {
  moduleRules.push({
    test: /\.s[ac]ss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  });
}

// LESS
if (isLoaderAvailable('less-loader')) {
  moduleRules.push({
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader'],
  });
}

// Stylus
if (isLoaderAvailable('stylus-loader')) {
  moduleRules.push({
    test: /\.styl$/,
    use: ['style-loader', 'css-loader', 'stylus-loader'],
  });
}

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: config.MFE_PORT,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: false,
        warnings: false,
        runtimeErrors: false,
      },
    },
  },
  module: {
    rules: moduleRules,
  },
  target: 'web',
  devtool: 'eval-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
  ],
});
