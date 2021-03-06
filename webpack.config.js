const path = require('path');
const webpack = require('webpack');

const host = 'localhost';
const port = 3000;
const hotScript = `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`;

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  entry: {
    app: [hotScript, path.join(__dirname, 'chrome/extension/index')],
    background: [hotScript, path.join(__dirname, 'chrome/extension/background')],
  },
  devMiddleware: {
    publicPath: `http://${host}:${port}/js/`,
    stats: {
      colors: true,
    },
    noInfo: true,
  },
  output: {
    path: path.join(__dirname, '../dev/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    publicPath: `http://${host}:${port}/js/`,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  resolve: {
    root: [
      path.resolve(__dirname, 'app'),
      path.resolve(__dirname, 'chrome'),
      path.resolve(__dirname, 'node_modules'),
    ],
    extensions: ['', '.js'],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['react-hmre'],
      },
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss',
      ],
    }],
  },
};
