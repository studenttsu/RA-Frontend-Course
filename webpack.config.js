const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
};

module.exports = {
  entry: PATHS.src + '/index.js',
  output: {
    path: PATHS.dist,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]'
          }
        }]
      },
      {
        test: /\.(woff|ttf|otf|eot|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      template: PATHS.src + '/index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      { from: PATHS.src + '/img', to: 'img' },
      { from: PATHS.src + '/fonts', to: 'fonts' },
    ])
  ],
  devServer: {
    port: '4200'
  }
}