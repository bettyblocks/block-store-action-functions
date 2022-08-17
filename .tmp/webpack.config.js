module.exports = {
  target: 'node',
  entry: './app.js',
  mode: 'production',
  output: {
    filename: 'app.bundle.js',
    libraryTarget: 'var',
    library: 'app',
  },
};
