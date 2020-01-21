const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = (env, argv) => {
    const isProductionBuild = argv.mode === 'production';

    const js = {
        test: /\.ts$/,
        loader: 'ts-loader'
    };

    const vue = {
        test: /\.vue$/,
        loader: "vue-loader"
    };

    const pug = {
        test: /\.pug$/,
        oneOf: [
            {
                resourceQuery: /^\?vue/,
                use: ["pug-plain-loader"]
            },
            {
                use: ["pug-loader"]
            }
        ]
    };

    const styles = {
        test: /\.(p|post|)css$/,
        use: [ 'style-loader', 'postcss-loader' ]
    };

    const files = {
        test: /\.(png|jpe?g|gif|woff2?)$/i,
        loader: 'file-loader',
        options: {
            name: '[hash].[ext]'
        }
    };

    const svg = {
        test: /\.svg$/,
        use: [
            {
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: svgPath => `sprite${svgPath.substr(-4)}`
                }
            },
            'svg-transform-loader',
            {
                loader: 'svgo-loader',
                options: {
                    plugins: [
                        { removeTitle: true },
                        {
                            removeAttrs: {
                                attrs: '(fill|stroke)'
                            }
                        }
                    ]
                }
            }
        ]
    };

    const config = {
        entry: './src/main.ts',

        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'index.js'
        },

        devServer: {
            overlay: true
        },

        devtool: 'source-map',

        module: {
            rules: [js, styles, files, svg, pug, vue]
        },

        resolve: {
            alias: {
                vue$: "vue/dist/vue.esm.js"
            }
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: 'Портфолио',
                template: './src/index.pug'
            }),
            new SpriteLoaderPlugin({ plainSprite: true }),
            new VueLoaderPlugin(),
            new FaviconsWebpackPlugin('./src/images/favicon.png')
        ]
    };

    if (isProductionBuild) {
        config.devtool = 'none';
        config.plugins = (config.plugins || []).concat([
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            // new MiniCssExtractPlugin()
        ]);

        config.optimization = {};

        config.optimization.minimizer = [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin()
        ];
    }

    return config;
};
