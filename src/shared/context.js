import { PropTypes } from 'react';
import { Context } from '../utils/state';

/**
  Context Types
 */
export default new Context({
	store: PropTypes.object,
	router: PropTypes.object,
	location: PropTypes.object,
	history: PropTypes.object
});
