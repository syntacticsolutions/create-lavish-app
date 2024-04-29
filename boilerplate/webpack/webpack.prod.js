const { default: merge } = require('webpack-merge');
const common = require('./webpack.common');
const containerPlugin = require('./container');
const childPlugin = require('./microapp');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    test: /.(css|sass|scss)$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
  });
}

// LESS
if (isLoaderAvailable('less-loader')) {
  moduleRules.push({
    test: /\.less$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
  });
}

// Stylus
if (isLoaderAvailable('stylus-loader')) {
  moduleRules.push({
    test: /\.styl$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
  });
}

const prodConfig = {
  mode: 'production',
  plugins: [
    config.mfeType === 'Container' ? containerPlugin : childPlugin,
    new MiniCssExtractPlugin({
      filename: './dist/styles/[name].css',
    }),
  ],
  module: {
    rules: moduleRules,
  },
};

module.exports = merge(common, prodConfig);
