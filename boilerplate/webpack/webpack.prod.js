const { default: merge } = require('webpack-merge');
const common = require('./webpack.common');
const containerPlugin = require('./container');
const childPlugin = require('./microapp');

const prodConfig = {
  mode: 'production',
  plugins: [config.mfeType === 'Container' ? containerPlugin : childPlugin],
};

module.exports = merge(common, prodConfig);
