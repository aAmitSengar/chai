import React, { Component } from 'react';
import { withRouter } from 'react-router';
import AddToDesktop from './components/common/AddToDesktop';
import * as browserDetails from 'browser-details';
import { connect } from 'react-redux';
import Layout from '../app/utils/Layout';
import variables from "./styles/variables";
import { bindActionCreators } from 'redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// import logo from '../images/app_logo.svg';
import './App.css';

const theme = createMuiTheme({
	palette: {
		type: 'dark', // Switching the dark mode on is a single property value change.
		primary: { main: variables.blue, light: variables.dashboard_background },
		secondary: { main: variables.dashboard_background }
	},
	typography: {  useNextVariants: true,
		fontFamily: variables.primaryFont 
	},
	overrides: {
		MuiMenu: {
			paper: {
				backgroundColor: 'white',
				minWidth: '100%',
				height: 'auto'
			}
		}
	}
});

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
		// const { showBanner, isChrome } = this.state;

		return (
			<MuiThemeProvider theme={theme}>
				<Layout />
				<AddToDesktop>Install As Application</AddToDesktop>
			</MuiThemeProvider>
			// <div className="App">
			// 	<header className="App-header">
			// 		<img src={logo} className="App-logo" alt="logo" />
			// 		<p>welcome</p>
			// 		<Conditional				>
			// 			Install As Application
			// 		</Conditional>
			// 	</header>
			// </div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.login,
		apistatus: state.apistatus
	};
};

const mapDispatchToProps = (dispatch) => {
	  return bindActionCreators({
	  }, dispatch)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
// export default withRouter(App);
