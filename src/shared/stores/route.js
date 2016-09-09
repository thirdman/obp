import { observable, action } from 'mobx';

export default class RouteStore {
	@observable nextPath = '';

	@action
	updateNextPath(nextPath = '') {
		this.nextPath = nextPath;
	}
}
