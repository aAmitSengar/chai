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
import ForgotPasswordAPI from '../../actions/apis/forgot';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import APITransport from '../../actions/apitransport/apitransport';
import variables from '../../styles/variables';
import { Alert } from 'reactstrap';

const styles = {
  card: {
    'background-color': '#ffffff',
    color: 'black',
    'padding-bottom': 20,
    height: 700,
    '& label':{
      color:'black',
    },
    '& div ::before':{
      borderBottom:'1px solid gray'
    },
    '& label + div':{
      width:210    
    },
    '& input':{
      color:'black'
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
    'padding-top': 150,
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

};

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      status: '',
      isAlertOpen:false
    }
    this.onDismiss = this.onDismiss.bind(this);
  }
  onDismiss() {
      this.setState({
          isAlertOpen: false,
      });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

 componentWillReceiveProps(nextProps){
  if(nextProps.forgotPasswordRes!==this.props.forgot){
    this.setState({
      email:'',
      isAlertOpen:true
    });
  }else{
    this.setState({
      isAlertOpen:false
    });
  }
 }

  sendVerificationEmail = () => {
    const { email } = this.state;
    let apiObj = new ForgotPasswordAPI(email, 2000)
    this.props.APITransport(apiObj);
  }

  render() {
    const { classes } = this.props;
    return (

      <div>
        <Card className={classes.card}>
          <form className={classes.container} noValidate autoComplete="off">
            <CardContent className={classes.align}>
              <img src={logo} className={classes.appLogo} alt="App Logo"/>

              <Typography headlineMapping={{
                h1: 'h1',
                h2: 'h1',
                title: 'h1',
              }} className={classes.color}>
                Forgot your password?
                </Typography>
              <Typography className={classes.color}>
                No Problem. Give us your email or username <br />
                and we will send you an email to change it.
                </Typography>

              <TextField
                id="email"
                label="Enter your registered email ID"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
              />
            </CardContent>
            <CardActions className={classes.jstify}>
              <div>
                <Link to="/login">
                  <Button className={classes.button}>Login</Button>
                </Link>
                &nbsp;&nbsp;
                <Button variant="contained" className={classes.button} onClick={(event) => this.sendVerificationEmail(event)}>
                  Send Verification Email
              </Button>
              </div>
            </CardActions>
          </form>
          <br />
          <Alert isOpen={this.state.isAlertOpen} color="success" className={classes.alert} toggle={this.onDismiss}>
              Email has been sent successfully.
          </Alert>
        </Card>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    forgot: state.forgotPasswordRes,
    apistatus: state.apistatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    APITransport: APITransport
  }, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Forgot));