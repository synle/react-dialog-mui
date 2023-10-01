const path = require('path');

const appPackage = require('./package.json');

const externals = {};
const externalsDeps = [
  ...Object.keys(appPackage.optionalDependencies || []),
  ...Object.keys(appPackage.dependencies || []),
];
for (const dep of externalsDeps) {
  externals[dep] = `${dep}`;
}

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'commonjs',
  },
  mode: 'production',
  devtool: 'inline-source-map',
  externals,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
