const path = require('path')

const moduleRules = [
  {
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    use: 'babel-loader',
    test: /.(ts|tsx|js|jsx)$/,
    exclude: /node_modules/,
  },
  { type: 'asset/inline', test: /\.(png|jpg|jpeg|gif|svg)$/i },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  }
]


module.exports = {
  entry: './index.tsx',
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    publicPath: "",
    assetModuleFilename: "images/[hash][ext][query]"
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "async",
      cacheGroups: {
        default: {
          minChunks: 2,
          reuseExistingChunk: true
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "async",
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: moduleRules,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: ['node_modules'],
  }
};
