const path = require('path');

module.exports = {
  entry: ['./src/index.js',
    './src/newProject.js',
    './src/newTasks.js',
    './src/asideBtnAllTasks.js',
    './src/asideBtnToday.js',
    './src/asideBtnWeek.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ],
  }
};