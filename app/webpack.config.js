const path = require('path');

module.exports = {
  resolve: {
    alias: {
      common: path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
      store: path.resolve(__dirname, 'src/store'),
    },
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
};
