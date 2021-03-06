import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

/*
 *  If we are on client, append /api so when the request get to the server,
 *	it knows and proxy the request to api server
 */
function formatUrl(path) {
	const adjustedPath = path[0] !== '/' ? '/' + path : path;
	if (__SERVER__) {
		// Prepend host and port of the API server to the path.
		if (process.env.MODE === 'local') {
			return config.apiHost + ':' + process.env.APIPORT + adjustedPath;
		} else {
			return config.apiHost + adjustedPath;
		}
	}
	// Prepend `/api` to relative URL, to proxy to API server.
	return '/api' + adjustedPath;
}

/*
 * This silly underscore is here to avoid a mysterious
 * "ReferenceError: ApiClient is not defined" error
 * Remove it at your own risk.
 */
class _ApiClient {

	jwt = null;

	constructor(req) {
		methods.forEach((method) =>
			this[method] = (path, { params, data, headers } = {}) => new Promise((resolve, reject) => {
				const request = superagent[method](formatUrl(path));
				// if header are supplied, set header
				if (headers && headers.length) {
					headers.map(({tag, value}) => {
						request.set(tag, value);
					});
				}
				// always set authorisation header if we have jwt
				if (this.jwt) {
					request.set('authorization', this.jwt);
				}
				// if params are supplied, send with params
				if (params) { request.query(params); }
				// if data are supplied, send with data
				if (data) { request.send(data); }
				// if on server and the req has cookie, set cookie
				if (__SERVER__ && req.get('cookie')) {
					request.set('cookie', req.get('cookie'));
				}

				request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
			})
		);
	}

	setJwt(token) {
		this.jwt = token;
	}
}

const ApiClient = _ApiClient;

export default new ApiClient();
