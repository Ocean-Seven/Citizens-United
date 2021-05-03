const path = require('path');
// const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  watch: true,
  mode: 'development',
  entry: path.resolve(__dirname, './client/src'),
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js[x]?/,
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // devServer: {
  //   historyApiFallback: true,
  // },
  // plugins: [
  //     new HtmlWebPackPlugin({
  //     template: path.resolve(__dirname, './client/dist/index.html'),
  //     // filename: 'index.html'
  //   })
  // ]
};

