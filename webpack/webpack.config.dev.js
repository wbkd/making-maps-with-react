const Path = require('path');
const Autoprefixer = require('autoprefixer');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  devServer:
  {
    contentBase: './build',
    hot: true,
    compress: true,
    port: 3000,
    inline: true,
    publicPath: '/',
    historyApiFallback: true
  },
  entry: [
    require.resolve('./polyfills'),
    Path.resolve(__dirname, '../src/index.js')
  ],
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/bundle.js'
  },
  plugins: [
    new Webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        eslint: {
          configFile: Path.resolve('./.eslintrc')
        },
        postcss: [
          Autoprefixer
        ]
      }
    }),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BASENAME: JSON.stringify('/')
      }
    }),
    new Webpack.HotModuleReplacementPlugin(),
    // This Webpack plugin ensures npm install <library> forces a project rebuild.
    new WatchMissingNodeModulesPlugin(Path.resolve(__dirname, 'node_modules')),
    new HtmlWebpackPlugin({
      inject: true,
      template: Path.resolve(__dirname, '../src/index.html'),
      basename: process.env.BASENAME
    }),
    // copy data folder to make it available in redux loadData action
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../src/public/data'), to: 'data' }
    ])
  ],
  resolve: {
    alias: {
      'mapbox-gl$': Path.resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.styl$/i,
        enforce: 'pre',
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(js|jsx)$/,
        include: Path.resolve(__dirname, '../src'),
        exclude: /(node_modules|webpack)/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[ext]'
          }
        }
      }
    ]
  }
};
