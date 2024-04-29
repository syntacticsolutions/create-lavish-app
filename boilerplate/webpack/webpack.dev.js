const merge = require('lodash/merge');
const common = require('./webpack.common');
const containerPlugin = require('./container');
const childPlugin = require('./microapp');
const config = require('./config');

function isLoaderAvailable(loaderName) {
  try {
    require.resolve(loaderName);
    return true;
  } catch (e) {
    return false;
  }
}

const moduleRules = [];

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

const devConfig = {
  mode: 'development',
  devServer: {
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
    config.mfeType === 'Container' ? containerPlugin : childPlugin,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
  ],
};

module.exports = merge(common, devConfig);
