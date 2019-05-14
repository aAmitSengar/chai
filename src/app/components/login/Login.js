import React, { Component } from 'react';
// import PublicNavBar from '../common/PublicNavBar';
import PublicFooter from '../common/Footer';
import '../../../styles/main.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import BusyIndicator from '../common/BusyIndicator';
import Toast from '../common/Toast';
import logo from '../../../images/logo.png';

import LoginAPI from '../../actions/apis/login';
import APITransport from '../../actions/apitransport/apitransport';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import variables from '../../styles/variables';

const styles = {
	productLogo: {
		width: '100%'
		//height: '960px',
	},
	card: {
		marginTop: '20px',
		backgroundColor: variables.white,
		// maxWidth: 600,
		display: 'flex',
		boxShadow: 'none',
		// textAlign: 'center',
		// height: 'calc(100vh - 80px)'
	},
	cardContainer: {
		// background: 'red',
		color: variables.lighterGray,
		display: 'flex',
		flexDirection: 'column',
		minWidth: '25%',
		margin: 'auto',
        // marginTop: 80,
        overflowX: 'auto',
        overflowY: 'hidden',
		textAlign: '-webkit-center'
		// textAlign:'center'
	},
	title: {
		margin: 10,
		fontSize: 30,
		color: 'black',
		fontWeight: 500
	},
	subtitle: {
		marginBottom: 10,
		fontSize: 18,
		color: variables.lighterGray,
		fontWeight: 500
	},
	textField: {
		color: variables.black,
		'&:before': {
			borderBottom: `1px solid ${variables.black}`
		}
	},
	inputLabel: {
		color: variables.black,
		fontWeight: 500
	},
	inputEmail: {
		color: variables.black
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	button: {
		//marginLeft: '20px',
		marginTop: 20,
		width: '100%',
		display: 'flex',
		backgroundColor: '#45BD7F',
		'&:focus, &:hover, &:active ': {
			backgroundColor: '#45BD7F'
		}
	},
	floatright: {
		flexDirection: 'row-reverse',
		display: 'flex',
		fontFamily: variables.barlow
	},
	linkClass: {
		color: `${variables.lighterGray}`,
		textDecoration: 'none',
		cursor: 'pointer',
		outline: 'none',
		'&:focus, &:hover, &:visited, &:link, &:active ': {
			textDecoration: 'none'
		}
	},
	appLogo: {
		margin: 10,
		width: 88,
		height: 37
	}
};
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			role: '',
			demo: false
		};
		this.loginStatus = false;
	}

	/**
     * user input handlers
     * captures text provided in email and password fields
     */
	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		});
		this.loginStatus = false;
	};

	/**
     * user input handlers
     * captures form submit request
     */
	processLoginButtonPressed = () => {
		// const { email, password, role } = this.state;
		this.loginStatus = true;
		this.setState({ demo: true });
		// let apiObj = new LoginAPI(email, password, role, 4000)
		// this.props.APITransport(apiObj)
	};
	onKeyDown = (event) => {
		// 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
		if (event.key === 'Enter') {
			event.preventDefault();
			event.stopPropagation();
			this.processLoginButtonPressed();
		}
	};

	/**
     * render
     * login input form
     */
	renderLoginForm = () => {
		const { classes } = this.props;
		return (
			<div>
				<Card className={classes.card}>
					<CardContent className={classes.cardContainer}>
						<img src={logo} className={classes.appLogo} alt="" />
						<Typography className={classes.title}>Hello Welcome!</Typography>
						<Typography className={classes.subtitle}>
							Login to app, and manage your <br />complex schedule.
						</Typography>
						<TextField
							id="username"
							label="Email / Username"
							placeholder="Username"
							fullWidth
							required={true}
							InputProps={{
								classes: {
									root: classes.textField,
									input: classes.inputEmail
								}
							}}
							InputLabelProps={{
								className: classes.inputLabel
							}}
							margin="normal"
							value={this.state.email}
							onChange={this.handleChange('email')}
							onKeyDown={this.onKeyDown}
						/>

						<TextField
							id="password"
							label="Password"
							placeholder="*********"
							fullWidth
							required={true}
							InputProps={{
								classes: {
									root: classes.textField,
									input: classes.inputEmail
								}
							}}
							InputLabelProps={{
								className: classes.inputLabel
							}}
							margin="normal"
							type="password"
							value={this.state.password}
							onChange={this.handleChange('password')}
							onKeyDown={this.onKeyDown}
						/>

						<div className={classes.floatright}>
							<Link to="/forgot" className={classes.linkClass}>
								Forgot your password?
							</Link>
						</div>
						<div>
							<Button
								className={classes.button}
								variant="outlined"
								size="large"
								onClick={(event) => this.processLoginButtonPressed(event)}
							>
								LOGIN
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	};

	renderLogin = () => {
		return (
			<div>
				<BusyIndicator progress={this.props.apistatus.progress} />
				{this.props.apistatus.error && this.loginStatus ? (
					<Toast show={true} message={'Login failed, invalid username or password.'} />
				) : (
					<div />
				)}
				{/* <PublicNavBar />
                <div className="leftcolumn">
                    <img src={logo} style={styles.productLogo} alt={''} />
                </div>
                <div className="rightcolumn">
                    {
                        this.renderLoginForm()
                    }
                </div> */}
				{this.renderLoginForm()}
				<PublicFooter />
			</div>
		);
	};

	render() {
		// if (this.props.user.email && this.props.user.token) {
		if (this.state.demo === true) {
			return <Redirect to="/home" />;
		}

		return <div>{this.renderLogin()}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.login,
		apistatus: state.apistatus
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			APITransport: APITransport
		},
		dispatch
	);
};

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login)));
