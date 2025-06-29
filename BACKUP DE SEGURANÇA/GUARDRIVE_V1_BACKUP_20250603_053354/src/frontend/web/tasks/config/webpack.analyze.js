const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 250000,
    },
  },
};
