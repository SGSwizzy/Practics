const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => isDev ? `[name].$(ext)` : `[name].[contenthash].$(ext)`;

const opimization = () => {
    const configObj = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (isProd) {
        configObj.minimizer = [
            new CSSMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ];
    }
    return configObj;
};

const plugins = () => {
    const basePlugins = [
        new HTMLWebpackPlugin ({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minfy: {
                collapseWhitescape: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`,
        }),
        new CopyWebpackPlugin ({
            patterns: [
                {from:path.resolve(__dirname, 'src/assets') , to: path.resolve(__dirname, 'dist')}
            ]
        }),
    ];

    if (isProd) {
        basePlugins.push(
            new ImageminPlugin({
                bail: false,
                cache: true,
                imageminOptions: {

                  plugins: [
                    ["gifsicle", { interlaced: true }],
                    ["jpegtran", { progressive: true }],
                    ["optipng", { optimizationLevel: 5 }],
                    [
                      "svgo",
                      {
                        plugins: [
                          {
                            removeViewBox: false
                          }
                        ]
                      }
                    ]
                  ]
                }
              })
          
        )
    }
    
    return basePlugins;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './js/main.js',
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'dist'),
    },

    plugins: plugins(),
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        compress: true,
        hot: true,
        port: 3000,
      },

      devtool: isProd ? false : 'source-map',

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev
                        },                        
                    },
                    'css-loader'
                   ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath),  context) + '/';
                            },
                        }
                    },
                     'css-loader', 
                     'sass-loader'
                    ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
            test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `./img/${filename('[ext]')}`
                    }
                }],
            },
            {
                test: /\.(?:|woff2|woff)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: `./fonts/${filename('[ext]')}`
                        }
                    }],
                }
        ]
    }
};


// const path = require('path');
// const HTMLWebpackPlugin = require('html-webpack-plugin');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
// const TerserWebpackPlugin = require('terser-webpack-plugin');
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

// const isDev = process.env.NODE_ENV === 'development'
// const isProd = !isDev

// const optimization = () => {
//   const config = {
//     splitChunks: {
//       chunks: 'all'
//     }
//   }

//   if (isProd) {
//     config.minimizer = [
//       new CSSMinimizerWebpackPlugin(),
//       new TerserWebpackPlugin()
//     ]
//   }

//   return config
// }

// const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

// const cssLoaders = extra => {
//   const loaders = [
//     {
//       loader: MiniCssExtractPlugin.loader,
//       options: {
//         hmr: isDev,
//         reloadAll: true
//       },
//     },
//     'css-loader'
//   ]

//   if (extra) {
//     loaders.push(extra)
//   }

//   return loaders
// }

// const babelOptions = preset => {
//   const opts = {
//     presets: [
//       '@babel/preset-env'
//     ],
//     plugins: [
//       '@babel/plugin-proposal-class-properties'
//     ]
//   }

//   if (preset) {
//     opts.presets.push(preset)
//   }

//   return opts
// }


// const jsLoaders = () => {
//   const loaders = [{
//     loader: 'babel-loader',
//     options: babelOptions()
//   }]

//   if (isDev) {
//     loaders.push('eslint-loader')
//   }

//   return loaders
// }

// const plugins = () => {
//   const base = [
//     new HTMLWebpackPlugin({
//       template: './index.html',
//       minify: {
//         collapseWhitespace: isProd
//       }
//     }),
//     new CleanWebpackPlugin(),
//     new CopyWebpackPlugin({
//       patterns: [
//         {
//           from: path.resolve(__dirname, 'src/favicon.ico'),
//           to: path.resolve(__dirname, 'dist')
//         }
//       ]
//     }),
//     new MiniCssExtractPlugin({
//       filename: filename('css')
//     })
//   ]

//   if (isProd) {
//     base.push(new BundleAnalyzerPlugin())
//   }

//   return base
// }

// module.exports = {
//   context: path.resolve(__dirname, 'src'),
//   mode: 'development',
//   entry: {
//     main: ['@babel/polyfill', './index.jsx'],
//     analytics: './analytics.ts'
//   },
//   output: {
//     filename: filename('js'),
//     path: path.resolve(__dirname, 'dist')
//   },
//   resolve: {
//     extensions: ['.js', '.json', '.png'],
//     alias: {
//       '@models': path.resolve(__dirname, 'src/models'),
//       '@': path.resolve(__dirname, 'src'),
//     }
//   },
//   optimization: optimization(),
//   devServer: {
//     port: 4200,
//     hot: isDev
//   },
//   devtool: isDev ? 'source-map' : '',
//   plugins: plugins(),
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: cssLoaders()
//       },
//       {
//         test: /\.less$/,
//         use: cssLoaders('less-loader')
//       },
//       {
//         test: /\.s[ac]ss$/,
//         use: cssLoaders('sass-loader')
//       },
//       {
//         test: /\.(png|jpg|svg|gif)$/,
//         use: ['file-loader']
//       },
//       {
//         test: /\.(ttf|woff|woff2|eot)$/,
//         use: ['file-loader']
//       },
//       {
//         test: /\.xml$/,
//         use: ['xml-loader']
//       },
//       {
//         test: /\.csv$/,
//         use: ['csv-loader']
//       },
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: jsLoaders()
//       },
//       {
//         test: /\.ts$/,
//         exclude: /node_modules/,
//         loader: {
//           loader: 'babel-loader',
//           options: babelOptions('@babel/preset-typescript')
//         }
//       },
//       {
//         test: /\.jsx$/,
//         exclude: /node_modules/,
//         loader: {
//           loader: 'babel-loader',
//           options: babelOptions('@babel/preset-react')
//         }
//       }
//     ]
//   }
// }