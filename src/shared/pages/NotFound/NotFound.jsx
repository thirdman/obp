import React from 'react';
import { IndexLink } from 'react-router';

const globalStyles = require('../App/App.scss');

export default function NotFound() {
	return (
		<div className={globalStyles.container}>
			<h1>Doh! 404!</h1>
			<p>These are <em>not</em> the droids you are looking for!</p>
			<p><IndexLink to="/">Click here</IndexLink> to go back home.</p>
		</div>
	);
}