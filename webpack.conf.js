import webpack from "webpack";
import path from "path";

const CopyWebpackPlugin = require('copy-webpack-plugin');


export default {
  module: {
    loaders: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]"
      },
      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        query: {cacheDirectory: true}
      }
    ]
  },
  context: path.join(__dirname, "src"),
  plugins: [
    new webpack.ProvidePlugin({
      "fetch": "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch",
    }),
    new CopyWebpackPlugin([
        { from: 'js' },
        { from: 'fonts' },
    ])
  ],
  entry: {
    app: ["./js/app"],
    cms: ["./js/cms"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js"
  },
  externals:  [/^vendor\/.+\.js$/]
};
