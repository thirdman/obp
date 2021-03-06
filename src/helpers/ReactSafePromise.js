/**
 * Created by tdzl2_000 on 2016/1/5.
 */

function wrapPromise(promise, callbacks) {
	const key = callbacks.length;
	return new Promise((resolve, reject) => {
		// add callback when component did unmount
		callbacks.push(() => {
			// remove reference to callback.
			delete callbacks[key];
			resolve = null;
			reject = null;
		});

		promise.then(
			(value) => {
				// remove from array.
				delete callbacks[key];
				return resolve && resolve(value);
			},
			(err) => {
				// remove from array.
				delete callbacks[key];
				return reject && reject(err);
			}
		);
	});
}

export default function safePromise(Clazz) {
	return class extends Clazz {
		constructor(props) {
			super(props);
			this.__promiseCallbacks = [];
		}
		componentWillUnmount() {
			super.componentWillUnmount();
			this.__promiseCallbacks.forEach(v => v());
		}
		safePromise(promise) {
			return wrapPromise(promise, this.__promiseCallbacks);
		}
	};
}
