require('babel-polyfill');

// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './static/dist');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
	devtool: 'source-map',
	context: path.resolve(__dirname, '..'),
	entry: {
		'main': [
			// 'bootstrap-sass!./src/theme/bootstrap.config.prod.js',
			// 'font-awesome-webpack!./src/theme/font-awesome.config.prod.js',
			'./src/client.js'
		]
	},
	output: {
		path: assetsPath,
		filename: '[name]-[chunkhash].js',
		chunkFilename: '[name]-[chunkhash].js',
		publicPath: '/dist/'
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel']},
			{ test: /\.json$/, loader: 'json-loader' },
			{ test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap&localIdentName=[name]___[local]___[hash:base64:5]!postcss-loader!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?modules!postcss-loader') },
			// { test: /\.scss$/, loader:   'style!css?modules&importLoaders=2&sourceMap&localIdentName=[name]___[local]___[hash:base64:5]!postcss-loader!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true' },
			// { test: /\.css$/, loader:   'style!css?modules!postcss-loader' },
			{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
			{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
			{ test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
		]
	},
	stylelint: {
		
		//configBasedir:  path.join(__dirname, './'),
		configFile: path.join(__dirname, './stylelint.config.js'),  // loads the config overrides
		configOverrides: {
			rules: {
			// Your rule overrides here
				'selector-list-comma-newline-after': [ 'always', { severity: 'warn' } ]
			}
		}
	},
	postcss: function (webpack) {
		return [
			require("postcss-import")({ addDependencyTo: webpack }), //handles sass that has @import lines. Triggers webpack when they are changed.
			//precss, 
			//require("postcss-url")(),
			//either use autoprefixer OR cssnext (which includes it)
			//autoprefixer({browsers: ["last 2 version", "ios 6", "android 4"]}),
			require('postcss-cssnext')({ 
				browsers: 'last 2 versions'
			}),
			// add your "plugins" here
			// ...
			// and if you want to compress,
			// just use css-loader option that already use cssnano under the hood
			//require('postcss-modules'),
			require('lost'),
			//require("postcss-browser-reporter")(),
			require("postcss-reporter")()
		]
	},
	progress: true,
	resolve: {
		modulesDirectories: [
			'src',
			'node_modules'
		],
		extensions: ['', '.json', '.js', '.jsx']
	},
	plugins: [
		new CleanPlugin([assetsPath], { root: projectRootPath }),

		// css files from the extract-text-plugin loader
		new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			},

			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: false,
			__DEVTOOLS__: false
		}),

		// ignore dev config
		new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

		// optimizations
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),

		webpackIsomorphicToolsPlugin
	]
};
