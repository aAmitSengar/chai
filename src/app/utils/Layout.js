import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import NavDrawer from '../components/authenticated/navdrawer/NavDrawer';
import NavBar from '../components/common/NavBar';
// import DashboardFooter from '../components/common/dashboardFooter';
import variables from '../styles/variables';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		//minHeight: '100vh',
		zIndex: 1,
		position: 'relative',
		display: 'flex',
		paddingLeft: 100,
		height: '100vh',
		width: '100vw',
		flexDirection: 'column',
		overflowX: 'hidden',
		backgroundColor: '#1B1C20'
	},
	content: {
		flexGrow: 1,
		backgroundColor: variables.black,
		padding: theme.spacing.unit * 3,
		minWidth: 0,
		marginTop: theme.spacing.unit * 7,
		width: '100vw',
		height: '100vh'
	},
	mainContent: {
		minHeight: '-webkit-fill-available',
		padding: 5,
		minWidth: '-moz-available',
		// paddingRight: 22,
		marginTop: 50
	}
});

class Layout extends Component {
	skipLayout() {
		return this.props.location.pathname !== '/login' && this.props.location.pathname !== '/' ? true : false;
	}
	prepareLayout() {
		const { classes } = this.props;
		let notLogin =
			this.props.location.pathname !== '/login' &&
			this.props.location.pathname !== '/' &&
			this.props.location.pathname !== '/forgot' &&
			this.props.location.pathname.slice(0, 14) !== '/resetPassword';
		if (notLogin) {
			return (
				<div className={classes.root}>
					<NavBar key={0} />,
					<NavDrawer key={1} />
					<div className={classes.mainContent}>
						<AppRouter />
					</div>
					{/* {this.props.location.pathname === '/home' &&
                        <DashboardFooter />
                    } */}
				</div>
			);
		} else {
			return <AppRouter />;
		}
	}

	render() {
		return this.prepareLayout();
	}
}

export default withRouter(withStyles(styles)(Layout));
