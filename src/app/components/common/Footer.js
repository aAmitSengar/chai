import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import '../../../styles/main.css';
import logo from '../../../images/logo.png';
import variables from '../../styles/variables';

const styles = {
    appbar: {
        // height: '60px',
        backgroundColor: 'white',
        color: variables.lighterGray,
        fontFamily: variables.barlow,
        textAlign: 'center',
        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor:'green',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    appLogo: {
        //margin: 5,
        width: 49,
        height: 20,
    },
    text: {
        color: 'black'
    },
    tLeft: {
        float: 'left',
        width: '40%',
        //'padding-bottom':10
    },
    tRight: {
        float: 'right',
        //width:'60%',
        'padding-right': 10,
        fontFamily: variables.barlow,
        '&:focus, &:hover, &:visited, &:link, &:active ': {
            textDecoration: "none",
            color: variables.white,
        },
        '& span': {
            color: variables.lighterGray,
            textDecoration: "none",
            cursor: "pointer",
            outline: "none",
            '&:focus, &:hover, &:visited, &:link, &:active ': {
                textDecoration: "none",
                color: variables.lighterGray,
            }
        }
    }
};

class PublicFooter extends Component {

    render() {
        const { classes } = this.props;
        return (
            <footer className="page-footer font-small">
            </footer>
            // <AppBar position="static" color="default" className={classes.appbar}> 
            //         <footer className="page-footer font-small"> 
            //         <div className="footer-copyright py-3">
            //             {/* <div className={classes.tLeft}>
            //                 &nbsp;&nbsp;© {new Date().getFullYear()} <img src={logo} className={classes.appLogo}  alt="Footer logo"/>
            //                 &nbsp;&nbsp; All rights reserved | Powered by ...
            //             </div> */}
            //             <div className={classes.tRight}>
            //                 <span> About, </span>
            //                 <span> Feedback, </span>
            //                 <span> Recommend this, </span>
            //                 <span> Help, </span>
            //                 <span> FAQ, </span>
            //                 <span> Contact </span>
            //             </div>
            //         </div>

            //         </footer>

            // </AppBar>
        )
    }
}

export default withStyles(styles)(PublicFooter);