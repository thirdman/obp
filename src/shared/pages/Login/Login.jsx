import React, {Component} from 'react';
import Helmet from 'react-helmet';
import cx from 'classnames';
import { connect } from '../../../utils/state';

@connect('store')
export default class Login extends Component {

	state = {
		error: null
	}

	handleSubmit = (event) => {
		if (event) { event.preventDefault(); }
		const { auth } = this.context.store;
		const username = this.usernameInput.value;
		const password = this.passwordInput.value;

		if (!this.validateInput(username, password)) {
			return false;
		}
		auth.login({username, password});
		this.usernameInput.value = '';
		this.passwordInput.value = '';
	}

	validateInput = (username, password) => {
		if (!username || !password) {
			this.setState({ error: 'Missing credential(s)' });
			return false;
		}
		return true;
	}

	quickSubmit = (event) => {
		if (event.keyCode === 13) {
			this.handleSubmit(event);
		}
	}

	logout = () => {
		const { auth } = this.context.store;
		auth.logout();
	}

	render() {
		const { auth } = this.context.store;
		const { error } = this.state;
		const styles = require('./Login.scss');
		const globalStyles = require('../App/App.scss');

		return (
		<div className={cx(styles.loginPage, globalStyles.container)} >
			<Helmet title="Login" />
			{!auth.check &&
				<div className={styles.container}>
					<div className={cx(globalStyles.card, styles.loginCard)}>
						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<h2>{'Login'}</h2>
								<div
									className={cx(globalStyles.contentItem,
										globalStyles.hasValidation,
										globalStyles.required)}>
									<input
										id="username"
										type="text"
										ref={(ref) => this.usernameInput = ref}
										required="required"
										onKeyDown={this.quickSubmit} />
									<label htmlFor="username">Username/Email</label>
								</div>
								<div
									className={cx(globalStyles.contentItem,
										globalStyles.hasValidation,
										globalStyles.required)}>
									<input
										id="password"
										type="password"
										ref={(ref) => this.passwordInput = ref}
										required="required"
										onKeyDown={this.quickSubmit} />
									<label htmlFor="password">Password</label>
								</div>
								{(error) &&
									<div className={globalStyles.contentItem}>
										<p>{error || 'Failed to log in'}</p>
									</div>
								}
								<div className={globalStyles.contentItem}>
									<input
										type={'button'}
										content="log in"
										onClick={this.handleSubmit} />
								</div>
							</div>
						</form>
						<div className={styles.formInstructions}>
							<p>{`For your security, we require you to 
								confirm your access details before 
								connecting your nomos one organisation 
								to external applications.`}</p>
						</div>
					</div>
				</div>
			}
			{auth.check &&
				<div className={styles.container}>
					<p>{`You are currently logged in as "${auth.user.username}"`}</p>
					<input
						type={'button'}
						content="log out"
						onClick={this.logout} />
				</div>
			}
		</div>
		);
	}
}
