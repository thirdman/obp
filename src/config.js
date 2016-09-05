require('babel-polyfill');

// Workout whether in production or not
const environment = {
	development: {
		isProduction: false
	},
	production: {
		isProduction: true
	}
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
	host: process.env.APP_HOST,
	port: process.env.PORT,
	apiHost: process.env.API_HOST,
	apiPort: (process.env.APIPORT || 8080),
	app: {
		title: 'nomos one API manager',
		head: {
			titleTemplate: 'API manager',
			meta: [
				{name: 'description', content: 'nomos one APIs manager.'},
				{charset: 'utf-8'},
				{property: 'og:site_name', content: 'nomos one APIs manager - Better property software'},
				{property: 'og:locale', content: 'en_US'},
				{property: 'og:title', content: 'nomos one APIs manager'},
				{property: 'og:description', content: 'nomos one APIs manager - Better property software'},
				{property: 'og:card', content: 'summary'},
				{property: 'og:site', content: '@nomosone'},
				{property: 'og:creator', content: '@nomosone'},
				{property: 'og:image:width', content: '200'},
				{property: 'og:image:height', content: '200'}
			]
		}
	},

}, environment);
