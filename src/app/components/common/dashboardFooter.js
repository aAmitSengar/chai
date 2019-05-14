import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import '../../../styles/main.css';
import logo from '../../../images/logo.png';
import variables from '../../styles/variables';
import config from '../../configs/configs'


const styles = {
    fooDiv: {
        height: '40px',
        paddingTop:10,
        'text-align': 'center',
        color:variables.lighterGray,
        backgroundColor:'#1B1C20',       
        'border-top': '1px solid #857171',        
        //marginTop: 40,
        fontFamily:variables.primaryFont
    }
};

class DashboardFooter extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.fooDiv}>                
                <p>&copy;&nbsp;{new Date().getFullYear()}&nbsp;&nbsp;<img src={logo} alt=""/>
                <span>&nbsp;All rights reserved &#124; Powered by {config.POWERED_BY} </span>                
                </p>
            </div>
        )
    }
}

export default withStyles(styles)(DashboardFooter);