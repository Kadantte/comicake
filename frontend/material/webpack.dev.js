/* global require module */
var path = require("path"),
    webpack = require("webpack"),
    ini = require("ini"),
    fs = require("fs"),
    BundleTracker = require("webpack-bundle-tracker"),
    pp = "http://localhost:3000/static/bundles/";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

var config = ini.parse(fs.readFileSync("../../frontend_settings.ini", "utf-8"));

// 4 hotreload: node server.js
module.exports = {
    //context: __dirname,
    entry: {
        comicake: [
            "webpack-dev-server/client?http://localhost:3000",
            "webpack/hot/only-dev-server",
            "./assets/js/index",
            "./assets/css/main.scss"
        ],
        reader: [
            "xbreader-en", // TODO multilingual
            "xbstyles.css",
            "./assets/css/reader/styles.scss"
        ]
    },
    resolve: {
        modules: [
            "./assets/js",
            "./assets/css",
            "node_modules",
            "node_modules/xbreader/dist",
            "bower_components"
        ]
    },
    output: {
        path: path.resolve("../../static/bundles/"),
        filename: "[name]-[hash].js",
        publicPath: pp
    },
    /*optimization: {
        runtimeChunk: {
            name: 'vendor'
        },
    },*/
    module: {
        rules: [{
            test: /\.(s*)css$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: "[name]-[hash].css",
                    },
                },
                MiniCssExtractPlugin.loader,
                //{ loader: "extract-loader" },
                { loader: "css-loader", options:
                    {
                        importLoaders: 1,
                        sourceMap: true
                    }
                }/*,{
                    loader: "postcss-loader", options: {
                        plugins: () => [
                            require("postcss-cssnext")
                        ]
                    }
                }*/,
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        includePaths: [
                            "./frontend/assets/css",
                            "./node_modules"
                        ],
                        importer: function(url, prev) {
                            if(url.indexOf("@material") === 0) {
                                var filePath = url.split("@material")[1];
                                var nodeModulePath = `./node_modules/@material/${filePath}`;
                                return { file: require("path").resolve(nodeModulePath) };
                            }
                            return { file: url };
                        }
                    }
                },
            ]
        },
        {
            test: /\.js$/,
            loader: "babel-loader",
            query: {
                presets: ["@babel/preset-env"]
            }
        },
        {
            test: /\.(html)$/,
            use: {
                loader: "html-loader",
                options: {
                    attrs: [":data-src"],
                    ignoreCustomFragments: [/\{\{.*?}}/]
                }
            }
        },
        {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: "file-loader",
            options: {
                name: "[name].[ext]"
            }
        }],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
        new BundleTracker({filename: "../../webpack-stats.json"}),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name]-[hash].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ],
    devtool: "inline-source-map",
    devServer: {
        publicPath: pp,
        //contentBase: __dirname,
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 3000,
        progress: true,
        stats: {
            cached: false
        },
        headers: { "Access-Control-Allow-Origin": "*" }
    }
};