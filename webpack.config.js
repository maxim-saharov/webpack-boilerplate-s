const path = require( 'path' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )

// по умолчанию  mode: 'production',
// но мы тут явно указываем при запуске что нам нужно в переменную
// NODE_ENV и тут ее считываем и устанавливаем нужный нам режим
// в переменную что угодно можно написать а тут просто считать
let mode = process.env.NODE_ENV || 'development'

//console.log( process.env.NODE_ENV )
//console.log( mode )

const devMode = mode === 'development'
const target = devMode ? 'web' : 'browserslist'
const devtool = devMode ? 'source-map' : undefined

module.exports = {
   mode,
   target,
   devtool,
   devServer: {
      port: 3000,
      open: true,
      hot: true
   },
   //entry: ['@babel/polyfill', path.resolve( __dirname, 'src', 'index.js' )],
   entry: ['@babel/polyfill', path.resolve( __dirname, 'src', 'main.js' )],
   output: {
      path: path.resolve( __dirname, 'dist' ),
      clean: true, // 5.20.0+ Clean the output directory before emit.
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/[name][ext]'
   },
   plugins: [
      new HtmlWebpackPlugin( {
         //template: path.resolve( __dirname, 'src', 'index.html' )
         template: path.resolve( __dirname, 'src', 'main.html' )
      } ),
      new MiniCssExtractPlugin( {
         filename: '[name].[contenthash].css'
      } )
   ],

   module: {
      rules: [

         //html-loader
         {
            test: /\.html$/i,
            loader: 'html-loader'
         },

         // работа со стилями
         {
            test: /\.(c|sa|sc)ss$/i,
            use: [
               devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
               'css-loader',
               {
                  loader: 'postcss-loader',
                  options: {
                     postcssOptions: {
                        plugins: [require( 'postcss-preset-env' )]
                     }
                  }
               },
               'sass-loader'
            ]
         },

         // работа со шрифтами
         {
            test: /\.woff2?$/i,
            type: 'asset/resource',
            generator: {
               filename: 'fonts/[name][ext]'
            }
         },

         // тут работа с фото
         {
            test: /\.(jpe?g|png|webp|gif)$/i,
            // jpe?g - вопросительный знак означает что буква перед
            // ним может быть а может и не быть те есть 'e?'

            // 'i' - ignore case - игнорировать регистр
            // на сайте https://regex101.com/
            // отдельно включаются эти опции галочкой
            // - то есть JPG - то тоже будет ок.

            // $ - означает что конец строки
            use: [
               {
                  loader: 'image-webpack-loader',
                  options: {
                     mozjpeg: {
                        progressive: true
                     },
                     optipng: {
                        enabled: false
                     },
                     pngquant: {
                        quality: [0.65, 0.90],
                        speed: 4
                     },
                     gifsicle: {
                        interlaced: false
                     },
                     webp: {
                        quality: 75
                     }
                  }
               }
            ],
            type: 'asset/resource',
            generator: {
               filename: 'img/[name][ext]'
            }
         },

         // тут работа с фото и без ужатия
         {
            test: /\.(ico|svg)$/i,
            type: 'asset/resource',
            generator: {
               filename: 'icons/[name][ext]'
            }
         },

         //babel-loader
         {
            test: /\.m?js$/i,
            exclude: /(node_modules|bower_components)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         }
      ]
   }
}
