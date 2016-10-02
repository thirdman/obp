import { Component } from 'react';
import { Link } from 'react-router';
import { Overview } from 'layouts';
import { ObjectInfo } from 'components';
import { Header } from 'containers';
import { connect } from '../../../utils/state';

// Khanh we need to abstract this for future flexibility:
// const xeroLogo = '/images/assets/xero.png';
// Faked logo url because png won't work:
const xeroLogo = 'http://www.stoneconsulting.com.au/wp-content/uploads/2016/04/xero-logo.png';

@connect('store')
export default class SettingsIntegrations extends Component {

	/*
	componentWillMount() {
		const { routeParams } = this.props;
		console.log(routeParams);
	}
	*/

	render() {
		const { app, auth } = this.context.store;
		const { currentOrg = null } = app;
		const org = auth.getOrg(currentOrg);
		let orgName = org && org.attributes.name;

		return (
			<Overview>
				<Header key={'layoutHeader'} title={`Your Integrations for ${orgName}`} />
				<div key={'layoutHero'}>
					<p>Select the integration you wish to activate or edit</p>
				</div>
				<div key={'layoutMain'} >
					<Link to={`/${currentOrg}/integrations/xero`}>
						<span>{'Xero'}</span>
					</Link>
					<Link to={`/${currentOrg}/integrations/xero`}>
						<ObjectInfo
							title="Xero"
							type="custom"
							subType="Financial Software"
							imageUrl={xeroLogo}
							buttons={[
								{	text: 'View',
									helpText: 'View this Integration',
									icon: {
										icon: 'view',
										color: 'lightGrey',
										classNameProps: ['normal']
										},
									classNameProps: ['normal']
								}
							]}
							classNameProps={['hasBorder']}
						/>
					</Link>
				</div>
				<div key={'layoutSecondary'} >
					Temporary text to remind Gareth about this space
				</div>
			</Overview>
		);
	}
}
