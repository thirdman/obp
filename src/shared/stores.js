// This file export a store object with is a collection of smaller stores
import { useStrict } from 'mobx';
import { store } from '../utils/state';

import UIStore from './stores/ui';
import AppStore from './stores/app';
import AuthStore from './stores/auth';
import RouteStore from './stores/route';
// import PostStore from './stores/post';

/**
	Enables / disables strict mode globally.
	In strict mode, it is not allowed to
	change any state outside of an action
 */
useStrict(true);

/**
	Stores
*/
export default store
	.setup({
		ui: UIStore,
		app: AppStore,
		auth: AuthStore,
		route: RouteStore
	});
