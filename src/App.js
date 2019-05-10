import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Conditional from './Conditional';
import * as browserDetails from 'browser-details';

import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showBanner: true,
			deferredPrompt: null
		};
	}
	getInitialState() {
		const { userAgent } = this.props;
		const bDetails = new browserDetails(userAgent);
		console.log(bDetails);

		return {
			deferredPrompt: null,
			showBanner: bDetails.isMobile() && bDetails.isAndroid() && !bDetails.isChrome(),
			isChrome: bDetails.isChrome()
		};
	}
	componentDidMount() {
		// const { isChrome } = this.state;
		// if (isChrome) {
		this.listenForInstallBanner();
		// }
	}

	onClickInstallApp() {
		const { deferredPrompt } = this.state;
		deferredPrompt.prompt();
		deferredPrompt.userChoice.then((choice) => {
			if (choice.outcome === 'accepted') {
				this.closeDialog();
			}
		});
	}

	listenForInstallBanner = () => {
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			this.setState({
				deferredPrompt: e,
				showBanner: true
			});
		});
	};

	closeDialog() {
		this.setState({ showBanner: false, deferredPrompt: null });
	}

	render() {
		const { showBanner, isChrome } = this.state;

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>welcome</p>
					<Conditional
						// style={{ color: '#F00' }}
						// condition={this.state.installButton}
						// onClick={this.installApp}
						// showBanner={showBanner}
						// isChrome={isChrome}
					>
						Install As Application
					</Conditional>
				</header>
			</div>
		);
	}
}

export default withRouter(App);
