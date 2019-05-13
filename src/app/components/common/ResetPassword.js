import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../../../images/logo.png';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import APITransport from '../../actions/apitransport/apitransport';
import variables from '../../styles/variables';
import ResetPwdCheckAPI from '../../actions/apis/resetPwdCheck';
import ChangePasswordAPI from '../../actions/apis/changePassword';
import { Alert } from 'reactstrap';
import BusyIndicator from '../common/BusyIndicator';

const styles = {
    card: {
        'background-color': '#ffffff',
        color: 'black',
        'padding-bottom': 20,
        //height: 700,
        '& label': {
            color: 'black',
        },
        '& div ::before': {
            borderBottom: '1px solid gray'
        },
        '& label + div': {
            width: 250
        },
        '& input': {
            color: 'black'
        },
        width: '50%',
        margin: '0 auto',
        boxShadow: 'none'
    },
    align: {
        'text-align': 'center'
    },
    color: {
        color: 'black',
        fontFamily: variables.barlow
    },
    appLogo: {
        'padding-top': 100,
        'padding-bottom': 35
    },
    jstify: {
        'justify-content': 'center'
    },
    button: {
        color: 'black',
        '& a': {
            color: variables.white,
            textDecoration: "none",
            cursor: "pointer",
            outline: "none",
            '&:focus, &:hover, &:visited, &:link, &:active ': {
                textDecoration: "none",
                color: variables.white,
            }
        }
    },
    alert: {
        width: '50%',
        margin: '0 auto'
    }
}

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            confirmPassword: '',
            isAlertOpen: false,
            alertColor: '',
            alertMsg: '',
            busyIndicator: true,
            token:''
        }
        this.onDismiss = this.onDismiss.bind(this);
    }
    onDismiss() {
        this.setState({
            isAlertOpen: false,
        });
    }

    handleChange_newPassword(event) {
        this.setState({
            newPassword: event.target.value,
        });
    }

    handleChange_confirmPassword(event) {
        this.setState({
            confirmPassword: event.target.value,
        });
    }

    sendResetPasswordEmail() {
        const { newPassword, confirmPassword } = this.state;
        var match = newPassword === confirmPassword;
        if (match) {
            this.setState({
                isAlertOpen: false,
            });
            let apiObj = new ChangePasswordAPI(this.state.token, newPassword, 2000)
            this.props.APITransport(apiObj);
        } else {
            this.setState({
                newPassword: '',
                confirmPassword: '',
                isAlertOpen: true,
                alertColor: 'danger',
                alertMsg: "Password didn't match!"
            });
        }

    }

    checkPasswordsMatch() {
        const { newPassword, confirmPassword } = this.state;
        var match = newPassword === confirmPassword;
        return match;
    }

    componentDidMount() {
        let token = this.props.location.pathname.slice(15, );
        this.setState({
            token:token
        });
        let apiObj = new ResetPwdCheckAPI(token, 2000)
        this.props.APITransport(apiObj);
    }

    componentWillReceiveProps(nextProps) {        
        if (this.props.checkToken.status === 1) {
            this.setState({
                newPassword: '',
                confirmPassword: '',
                busyIndicator: false,
                isAlertOpen: false,
            });
        }else if(this.props.checkToken.status === 0){
            this.setState({
                newPassword: '',
                confirmPassword: '',
                isAlertOpen: true,
                alertColor: 'danger ',
                alertMsg: "Token Expired!",
                busyIndicator: false,
            });

        }else {
            this.setState({
                newPassword: '',
                confirmPassword: '',
                isAlertOpen: true,
                alertColor: 'danger ',
                alertMsg: "Token Expired!",
                busyIndicator: false,
            });
        }
        if (this.props.changePassword.status === 1) {
            this.setState({
                newPassword: '',
                confirmPassword: '',
                isAlertOpen: true,
                alertColor: 'success ',
                alertMsg: "Password has been changed. You can login with your new password.",
                busyIndicator: false,
            });
        }else if(this.props.changePassword.status === 0){
            this.setState({
                newPassword: '',
                confirmPassword: '',
                isAlertOpen: true,
                alertColor: 'danger ',
                alertMsg: "Something went wrong.",
                busyIndicator: false,
            });
        }
        
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <BusyIndicator progress={this.state.busyIndicator} />
                <Card className={classes.card}>
                    <form className={classes.container} noValidate autoComplete="off">
                        <CardContent className={classes.align}>

                            <img src={logo} className={classes.appLogo} alt =""/>

                            <Typography variant="headline" component="h2" className={classes.color}>
                                Reset your password?
                </Typography>
                            <Typography className={classes.color}>
                                To reset your password, please enter your <br />
                                new password and confirm password.
                </Typography>

                            <TextField
                                id="newPassword"
                                label="New Password"
                                className={classes.textField}
                                value={this.state.newPassword}
                                onChange={this.handleChange_newPassword.bind(this)}
                                margin="normal"
                                type="password"
                            />
                            <br />
                            <TextField
                                id="confirmPassword"
                                label="Confirm Password"
                                className={classes.textField}
                                value={this.state.confirmPassword}
                                onChange={this.handleChange_confirmPassword.bind(this)}
                                margin="normal"
                                type="password"
                            />
                        </CardContent>
                        <CardActions className={classes.jstify}>
                            <div>
                                <Link to="/login">
                                    <Button className={classes.button}>Login</Button>
                                </Link>
                                &nbsp;&nbsp;
                <Button variant="contained" className={classes.button} onClick={(event) => this.sendResetPasswordEmail(event)}>
                                    Reset Password
                </Button>
                            </div>
                        </CardActions>
                    </form>
                </Card>
                <br />
                <Alert isOpen={this.state.isAlertOpen} color={this.state.alertColor} className={classes.alert} toggle={this.onDismiss}>
                    {this.state.alertMsg}
                </Alert>
                <br />
                <br />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        checkToken: state.resetPwdCheck,
        changePassword:state.changePassword,
        apistatus: state.apistatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        APITransport: APITransport
    }, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ResetPassword));