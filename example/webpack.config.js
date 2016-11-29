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
			exclude: /node_modules/,
			loader: 'babel-loader'
		},
		{
			test: /\.css$/, loader: 'css-loader' 
		}
		]
	}
};
