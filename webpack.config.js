const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const path = require("path");

module.exports = {
  module: {
    rules: [
      // `js` and `jsx` files are parsed using `babel`
      {
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
         test: /\.m?js/,
         resolve: {
             fullySpecified: false
         }
      },
		// `ts` and `tsx` files are parsed using `ts-loader`
      { 
        test: /\.(ts|tsx)$/, 
        loader: "ts-loader" 
      },
      // {
      //    test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //    type: 'src/assets/fonts/GoogleSansPlus',
      //   },
	  {
		test: /\.(css|scss)$/,
		use: ['style-loader', 'css-loader', 'sass-loader'],
	  },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
	new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
  resolve: {
   alias: {
     '@components': path.resolve(__dirname, './src/components'),
     '@hooks': path.resolve(__dirname, './src/hooks'),
     '@redux': path.resolve(__dirname, './src/redux'),
     '@functions': path.resolve(__dirname, './src/functions'),
     '@navigation': path.resolve(__dirname, './src/navigation'),
     '@styles': path.resolve(__dirname, './src/styles'),
     '@screens': path.resolve(__dirname, './src/screens'),
     '@utils': path.resolve(__dirname, './src/utils'),
     '@config': path.resolve(__dirname, './src/config'),
     '@assets': path.resolve(__dirname, './src/assets'),
     '@api': path.resolve(__dirname, './src/api'),
   },
      fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url"),
        "process": require.resolve("process"),
        "path": require.resolve("path-browserify"),
        "zlib": require.resolve("browserify-zlib")
      },
	  extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  }
};