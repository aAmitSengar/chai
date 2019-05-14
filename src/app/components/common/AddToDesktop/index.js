import React, { Component } from 'react';
// import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SVG from 'react-inlinesvg';
import configs from '../../../configs/configs';
import expoApple from '../../../../images/icons/export-variant.svg';
// import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import RestoreIcon from '@material-ui/icons/Restore';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
// import { close } from '@material-ui/core/Icon/Icon';
import styles from './style';

class AddToDesktop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deferredPrompt: null,
			showInstallMessage: true
		};
		this.addToHomeScreen = this.addToHomeScreen.bind(this);
		this.showAddToHomeScreen = this.showAddToHomeScreen.bind(this);
		this.addToGomeScreenIOS = this.addToGomeScreenIOS.bind(this);
		this.a2hs = React.createRef();
		this.a2hs_IOS = React.createRef();
	}
	// svgWrapper = ({ dangerouslySetInnerHTML, className }) => {
	//     return (
	//         <span dangerouslySetInnerHTML={dangerouslySetInnerHTML}
	//             className={className}
	//         />
	//     );
	// }

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
				this.setState({ showInstallMessage: true });
				this.showAddToHomeScreen();
			}.bind(this)
		);
		// Checks if should display install popup notification:
		if (this.isIos() && !this.isInStandaloneMode()) {
			this.setState({ showInstallMessage: true });
			this.showIosInstall();
		}
	}

	addToHomeScreen() {
		let a2hsBtn = this.a2hs.current;
		//document.querySelector('.ad2hs-prompt'); // hide our user interface that shows our A2HS button
		a2hsBtn.style.display = 'none'; // Show the prompt
		this.state.deferredPrompt.prompt(); // Wait for the user to respond to the prompt
		this.state.deferredPrompt.userChoice.then(
			function(choiceResult) {
				if (choiceResult.outcome === 'accepted') {
					console.log('User accepted the A2HS prompt');
				} else {
					console.log('User dismissed the A2HS prompt');
				}
				this.setState({ deferredPrompt: null });
			}.bind(this)
		);
	}

	addToGomeScreenIOS() {
		let a2hsBtn = this.a2hs_IOS.current;
		//document.querySelector('.ios-prompt'); // hide our user interface that shows our A2HS button
		a2hsBtn.style.display = 'none'; // Show the prompt
		this.state.deferredPrompt.prompt(); // Wait for the user to respond to the prompt
		this.state.deferredPrompt.userChoice.then(
			function(choiceResult) {
				if (choiceResult.outcome === 'accepted') {
					console.log('User accepted the A2HS prompt');
				} else {
					console.log('User dismissed the A2HS prompt');
				}
				this.setState({ deferredPrompt: null });
			}.bind(this)
		);
	}
	showAddToHomeScreen() {
		let a2hsBtn = this.a2hs.current;
		a2hsBtn.style.display = 'flex';
		a2hsBtn.addEventListener('click', this.addToHomeScreen);
	}

	showIosInstall() {
		let iosPrompt = this.a2hs_IOS.current;
		//document.querySelector('.ios-prompt');
		iosPrompt.style.display = 'flex';

		iosPrompt.addEventListener('click', () => {
			iosPrompt.style.display = 'none';
		});
	}

	render() {
		const { classes } = this.props;
		const { showInstallMessage } = this.state;
		return (
			showInstallMessage && (
				<div className={classes.addtohomebanner}>
					<div className={classes.addtohomecontent} onClick={this.addToHomeScreen} ref={this.a2hs}>
						<img src={configs.APP_LOGO} className={classes.addtohomeicon} alt={configs.APP_AAME} />
						<p className={classes.addtohometext}>Add to Home Screen</p>
					</div>
					<div onClick={this.addToGomeScreenIOS} className={classes.addtohomecontent} ref={this.a2hs_IOS}>
						<img src={configs.APP_LOGO} className={classes.addtohomeicon} alt={configs.APP_AAME} />
						<p className={classes.addtohometext}>
							To install this Web App in your iPhone/iPad press
							<SVG src={expoApple} className={classes.PlusButton} wrapper={this.svgWrapper} /> and then
							Add to Home Screen.
						</p>
					</div>
				</div>
			)
		);
	}
}

AddToDesktop.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddToDesktop);
