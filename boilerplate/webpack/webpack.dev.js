const merge = require('lodash/merge');
const common = require('./webpack.common');
const standalone = require('./webpack.standalone');
const containerPlugin = require('./container');
const childPlugin = require('./microapp');
const config = require('./config');

standalone.plugins.unshift(config.MFE_TYPE === 'Container' ? containerPlugin : childPlugin)

module.exports = merge(common, standalone);
