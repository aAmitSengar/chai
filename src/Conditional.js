import React, { Component } from 'react';

// import { close } from '@material-ui/core/Icon/Icon';
export default class Conditional extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showBanner: true,
			deferredPrompt: null
		};
		this.addToHomeScreen = this.addToHomeScreen.bind(this);
		this.showAddToHomeScreen = this.showAddToHomeScreen.bind(this);
	}

	// Detects if device is on iOS
	isIos = () => {
		const userAgent = window.navigator.userAgent.toLowerCase();
		return /iphone|ipad|ipod/.test(userAgent);
	};
	// Detects if device is in standalone mode
	isInStandaloneMode = () => 'standalone' in window.navigator && window.navigator.standalone;

	componentDidMount() {
		window.addEventListener(
			'beforeinstallprompt',
			function(e) {
				// Prevent Chrome 67 and earlier from automatically showing the prompt
				e.preventDefault();
				// Stash the event so it can be triggered later.
				this.setState({ deferredPrompt: e });
				this.showAddToHomeScreen();
			}.bind(this)
		);
		// Checks if should display install popup notification:
		// if (this.isIos() && !this.isInStandaloneMode()) {
		// 	// this.setState({ showInstallMessage: true });
		// 	this.showIosInstall();
		// }
	}

	addToHomeScreen() {
		let a2hsBtn = document.querySelector('.ad2hs-prompt'); // hide our user interface that shows our A2HS button
		a2hsBtn.style.display = 'none'; // Show the prompt
		this.state.deferredPrompt.prompt(); // Wait for the user to respond to the prompt
		this.state.deferredPrompt.userChoice.then(function(choiceResult) {
			if (choiceResult.outcome === 'accepted') {
				console.log('User accepted the A2HS prompt');
			} else {
				console.log('User dismissed the A2HS prompt');
			}
			this.setState({ deferredPrompt: null });
		});
	}
	showAddToHomeScreen() {
		let a2hsBtn = document.querySelector('.ad2hs-prompt');
		a2hsBtn.style.display = 'block';
		a2hsBtn.addEventListener('click', this.addToHomeScreen);
	}

	showIosInstall() {
		let iosPrompt = document.querySelector('.ios-prompt');
		iosPrompt.style.display = 'block';
		iosPrompt.addEventListener('click', () => {
			iosPrompt.style.display = 'none';
		});
	}

	render() {
		return (
			<div>
				<button type="button" className="ad2hs-prompt" onClick={this.addToHomeScreen}>
					Install Web App
				</button>
				<div className="ios-prompt">
					<span>&times;</span>
					<img src="/public/logo1.png" alt="add me" />
					<p>
						To install this Web App in your iPhone/iPad press
						<img src="logo1.png" alt="add" /> and then Add to Home Screen.
					</p>
				</div>
			</div>
		);
	}
}
