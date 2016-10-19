import React, {Component} from 'react';
import _ from 'lodash';
import {
	MyobHelper as myobClient,
	ReactSafePromise as safePromise
} from 'helpers';
import {
	Button,
	ContentItem,
	Info,
	InputSelect,
	InputText,
	Row,
	Section
} from 'components';
import { autobind } from 'core-decorators';
import { connect } from 'state';

@connect('store')
class InvoiceSection extends Component {

	state = {
		loaded: false,
		loading: '',
		error: false,
		companyFiles: [],
		companyFilesOptions: [],
		selectedFile: null,
		cfCredentials: {
			username: 'Administrator',
			password: ''
		},
		showEdit: null
	}

	componentDidMount() {
		myobClient.appStore = this.context.store.app;
		if (this.isConnected()) {
			this.fetchData();
		}
	}

	render() {
		const { currentOrg = {} } = this.context.store.app;
		const {
			loaded,
			loading,
			companyFilesOptions = [],
			selectedFile = '',
			cfCredentials,
			showEdit = !token.companyfile
		} = this.state;

		let token = currentOrg.accessTokens &&
			currentOrg.accessTokens.myob || null;
		return (
			<div>
				<div>{ loading }</div>
				{loaded && !token.companyfile || showEdit ?
					<Section
						hasBorder
						hasBackground
						title="Select your Company File"
						description={`The company file represents the MYOB company
							that nomos one will interact with. You will need to
							authorise using your admin username and password`}>
						<ContentItem title="company file">
							<InputSelect
								color="white"
								classNameProps={['wide']}
								onClickProps={this.changeCf}
								options={companyFilesOptions}
								content={
									selectedFile || ''} />
						</ContentItem>
						<ContentItem title="Username" hasPadding={false} >
							<InputText
								type="text"
								classNameProps={['normal']}
								backgroundColor="#fff"
								value={cfCredentials.username}
								onChangeProps={this.setCfUsername} />
						</ContentItem>
						<ContentItem title="Password" hasPadding={false}>
							<InputText
								type="password"
								classNameProps={['normal']}
								backgroundColor="#fff"
								value={cfCredentials.password}
								onChangeProps={this.setCfPassword} />
						</ContentItem>
						<Row>
							<Button
								classNameProps={['highlighted']}
								content="connect"
								onClickProps={this.checkAndSaveCf} />
						</Row>
					</Section> : null
				}
				{token.companyfile && !showEdit &&
					<Section
						hasBorder
						hasBackground
						title="Selected Company File"
						description={`The company file represents the MYOB company
							that nomos one will interact with. ${token.companyfile.Name}
							has been selected.`}>
						<ContentItem title="company file" isDisabled>
							<Info
								classNameProps={['normal']}
								backgroundColor="#fff"
								content={token.companyfile.Name} />
						</ContentItem>
						<ContentItem title="Country" hasPadding={false} isDisabled>
							<Info
								classNameProps={['normal']}
								backgroundColor="#fff"
								content={token.companyfile.Country} />
						</ContentItem>
						<ContentItem title="Uri" hasPadding={false} isDisabled>
							<Info
								classNameProps={['normal']}
								backgroundColor="#fff"
								content={token.companyfile.Uri} />
						</ContentItem>
						<Row>
							<Button
								classNameProps={['grey']}
								content="Change"
								onClickProps={this.toggleEditCf} />
						</Row>
					</Section>
				}
			</div>
		);
	}

	@autobind
	fetchData() {
		const { currentOrg = {} } = this.context.store.app;
		this.loading('Getting MYOB company files ....');
		this.safePromise(myobClient.request(
			'post',
			`organisations/${currentOrg.id}/myob/companyfilesGet`,
			currentOrg.accessTokens.myob,
			currentOrg
		))
		.then((res) => {
			this.setCompanyFiles(res.companyfiles || []);
			this.loading('');
			this.setState({ loaded: true });
		})
		.catch(this.handleError);
	}

	setCompanyFiles(companyFiles = []) {
		let mappedFiles;
		mappedFiles = companyFiles.map((file) => {
			return {
				title: file.Name,
				value: file.Id
			};
		});
		this.setState({
			companyFiles,
			companyFilesOptions: mappedFiles
		});
	}

	@autobind
	checkAndSaveCf() {
		const { cfCredentials, selectedFile, companyFiles } = this.state;
		const { currentOrg = {} } = this.context.store.app;

		let company = _.find(companyFiles, (comp) => {
			return comp.Id === selectedFile;
		});

		this.loading('Checking company file credentials ....');
		this.safePromise(myobClient.request(
			'post',
			`organisations/${currentOrg.id}/myob/companyfilesTest`,
			currentOrg.accessTokens.myob,
			currentOrg,
			{
				companyfile: {
					...company,
					username: cfCredentials.username,
					password: cfCredentials.password
				}
			}
		))
		.then((res) => {
			if (res && res.companyfilesTest === 'Passed') {
				this.loading('Saving company file credentials ....');
				return this.safePromise(myobClient.request(
					'post',
					`organisations/${currentOrg.id}/myob/companyfilesPost`,
					currentOrg.accessTokens.myob,
					currentOrg,
					{
						companyfile: {
							...company,
							username: cfCredentials.username,
							password: cfCredentials.password
						}
					}
				));
			} else {
				return new Promise((resolve, reject) => { reject('Access Denied'); });
			}
		})
		.then((res) => {
			console.log(res);
			this.context.store.app.updateCurrentOrg('accessTokens', {
					...currentOrg.accessTokens,
					myob: {
						...currentOrg.accessTokens.myob,
						companyfile: {
							...res.companyfile
						}
					}
				});
			this.loading('');
			this.setState({ showEdit: false });
		})
		.catch((err) => {
			this.loading(`Please recheck your credentials,
				the error is: ${decodeURI(err)}`,
				true);
			throw err;
		});
	}

	@autobind
	changeCf(code) {
		return () => {
			this.setState({ selectedFile: code });
		};
	}

	@autobind
	setCfPassword(password) {
		this.setState({
			cfCredentials: {
				...this.state.cfCredentials,
				password
			}
		});
	}

	@autobind
	setCfUsername(username) {
		this.setState({
			cfCredentials: {
				...this.state.cfCredentials,
				username
			}
		});
	}

	updateToken(newToken) {
		const { app } = this.context.store;
		const { currentOrg = {} } = app;
		let token =
			currentOrg.accessTokens &&
			currentOrg.accessTokens.xero || null;

		this.safePromise(myobClient.request(
			'put',
			`organisations/${currentOrg.id}/accessTokens?api=myob`,
			token,
			currentOrg,
			{ newToken }
		))
		.then(() => {
			app.updateCurrentOrg('accessTokens', {
				...currentOrg.accessTokens,
				xero: newToken
			});
		})
		.catch(this.handleError);
	}

	@autobind
	toggleEditCf() {
		this.setState({ showEdit: !this.state.showEdit });
	}

	isConnected() {
		const { currentOrg = {} } = this.context.store.app;
		if (currentOrg.accessTokens &&
			currentOrg.accessTokens.myob &&
			currentOrg.accessTokens.myob.connectedAt) {
			return true;
		} else {
			return false;
		}
	}

	loading(loading = '', error = false) {
		this.setState({
			loading,
			error
		});
	}

	@autobind
	handleError(err) {
		this.loading(`Please contact support,
			the error is: ${decodeURI(err)}`,
			true);
		throw err;
	}
}

export default safePromise(InvoiceSection);