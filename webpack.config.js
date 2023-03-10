const path = require('path');
const PugPlugin = require('pug-plugin');

// To be able to use env we should use function
// in our module.exports instead of regular object
module.exports = function (env) {

  const publicPath = env.mode === 'development' ? '/' : 'auto';
  const devtool = env.mode === 'development' ? 'eval-cheap-module-source-map' : false;
  const mode = env.mode === 'development' ? 'development' : 'production';

  return {
    mode,
    devtool,
    entry: {
      index: 'src/views/pages/home/index.pug',
      // Add all additional pug pages here 👈
    },
    output: {
      publicPath,
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: PugPlugin.loader,
        },
        {
          test: /\.(css|sass|scss)$/,
          use: ['css-loader', 'sass-loader'],
        },
        {
          test: /\.(jpg|png|svg|webp|ico)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name]-[contenthash:8][ext]',
          }
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name][ext]',
          }
        },
      ]
    },
    plugins: [
      new PugPlugin({
        pretty: true,
        js: {
          filename: 'assets/js/[name].[contenthash:8].js',
        },
        css: {
          filename: 'assets/css/[name].[contenthash:8].css',
        }
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      watchFiles: {
        paths: ['src/**/*.*'],
        options: {
          usePolling: true,
        },
      },
    },
    performance: {
      maxEntrypointSize: 1024000, // 1 mb
      maxAssetSize: 1024000, // 1 mb
    },
  }
};
