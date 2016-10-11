require('babel-polyfill');

// Webpack config for development
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var assetsPath = path.resolve(__dirname, '../static/dist');
// var mode = process.env.MODE;
var host = process.env.WEBPACK_HOST;
var port = (+process.env.PORT + 1);
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
	babelrcObject = JSON.parse(babelrc);
} catch (err) {
	console.error('==>     ERROR: Error parsing your .babelrc.');
	console.error(err);
}


var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};
var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});
delete babelLoaderQuery.env;

// Since we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];

module.exports = {
	context: path.resolve(__dirname, '..'),
	devtool: 'cheap-module-source-map',
	entry: {
		'main': [
			'react-hot-loader/patch',
			'webpack-hot-middleware/client?path=' + host + ':' + port + '/__webpack_hmr',
			'./src/client.jsx'
		]
	},
	output: {
		path: assetsPath,
		filename: '[name]-[hash].js',
		chunkFilename: '[name]-[chunkhash].js',
		publicPath: host + ':' + port + '/dist/'
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot-loader/webpack', 'babel-loader?' + JSON.stringify(babelLoaderQuery), 'eslint-loader']},
			{ test: /\.json$/, loader: 'json-loader' },
			{ test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[name]___[local]___[hash:base64:5]!postcss-loader!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true' },
			{ test: /\.css$/, loader: 'style!css?modules!postcss-loader' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "raw" },
			{ test: /\.md$/, loader: "raw" },
			{ test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
		]
	},
	node: {
		fs: "empty"
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
			'src/shared',
			'src/utils',
			'node_modules'
		],
		extensions: ['', '.json', '.js', '.jsx']
	},
	plugins: [
		// hot reload
		new webpack.HotModuleReplacementPlugin(),
		new webpack.IgnorePlugin(/webpack-stats\.json$/),
		new webpack.DefinePlugin({
			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: true,
			__DEVTOOLS__: !process.env.GMODE  // <-------- DISABLE redux-devtools HERE
		}),
		webpackIsomorphicToolsPlugin.development()
	]
};
