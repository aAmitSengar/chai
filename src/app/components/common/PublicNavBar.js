import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import '../../../styles/main.css';
import logo from '../../../images/logo.png';

const styles = {
    appbar: {
        backgroundColor: 'white'
    },
    appLogo: {
        margin: 10,
        width: 88,
        height: 37,
    },
};

class PublicNavBar extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position="static" color="default" className={classes.appbar}>
                    <img src={logo} className={classes.appLogo} alt=""/>
                </AppBar>
            </div>
        )
    }
  }
  
  export default withStyles(styles)(PublicNavBar);