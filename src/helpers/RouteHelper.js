class RouteHelper {
	nextPath = '';

	updateNextPath(nextPath = '') {
		this.nextPath = nextPath;
	}

	clear() {
		this.nextPath = '';
	}
}

export default new RouteHelper();