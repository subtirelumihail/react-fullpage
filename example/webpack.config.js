console.log(__dirname);
module.exports = {
	cache: true,
	debug: true,
	entry: [
		__dirname + '/demo'
	],
	publicPath: __dirname,
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel'
		},
		{
			test: /\.css$/, loader: 'css-loader' 
		}
		]
	}
};
