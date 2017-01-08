/**
 * Build config for electron 'Renderer Process' file
 */

 import path from 'path';
 import webpack from 'webpack';
 import validate from 'webpack-validator';
 import merge from 'webpack-merge';
 import formatter from 'eslint-formatter-pretty';
 import baseConfig from './webpack.config.base';

 const port = process.env.PORT || 3000;

 export default validate(merge(baseConfig, {
   debug: true,

   devtool: 'inline-source-map',

   entry: [
     `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
     'babel-polyfill',
     './app/index'
   ],

   output: {
     path: path.join(__dirname, 'app/dist'),
     publicPath: '../dist/'
   },

   //output: {
   //  publicPath: `http://localhost:${port}/dist/`
   //},

   module: {
     // preLoaders: [
     //   {
     //     test: /\.js$/,
     //     loader: 'eslint-loader',
     //     exclude: /node_modules/
     //   }
     // ],
     loaders: [
       {
         test: /\.global\.css$/,
         loaders: [
           'style-loader',
           'css-loader?sourceMap'
         ]
       },

       {
         test: /^((?!\.global).)*\.css$/,
         loaders: [
           'style-loader',
           'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
         ]
       },

       { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
       { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
       { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
       { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
       { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
     ]
   },

   eslint: {
     formatter
   },

   plugins: [
     // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
     new webpack.HotModuleReplacementPlugin(),

     // “If you are using the CLI, the webpack process will not exit with an error code by enabling this plugin.”
     // https://github.com/webpack/docs/wiki/list-of-plugins#noerrorsplugin
     new webpack.NoErrorsPlugin(),

     // NODE_ENV should be production so that modules do not perform certain development checks
     new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('development')
     })
   ],

   // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
   target: 'electron-renderer'
 }));

/*
import path from 'path';
import webpack from 'webpack';
import validate from 'webpack-validator';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BabiliPlugin from 'babili-webpack-plugin';
import baseConfig from './webpack.config.base';

export default validate(merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  entry: [
    'babel-polyfill',
    './app/index'
  ],

  output: {
    path: path.join(__dirname, 'app/dist'),
    publicPath: '../dist/'
  },

  module: {
    loaders: [
      {
        test: /\.global\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap'
        ]
      },

      {
        test: /^((?!\.global).)*\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ]
      },

      // Fonts
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },

      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        loader: 'url-loader'
      }
    ]
  },

  plugins: [
    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    // https://github.com/webpack/webpack/issues/864
    new webpack.optimize.OccurrenceOrderPlugin(),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new BabiliPlugin(),

    new ExtractTextPlugin('style.css', { allChunks: true }),

    new HtmlWebpackPlugin({
      filename: '../app.html',
      template: 'app/app.html',
      inject: false
    })
  ],

  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer'
}));
*/
