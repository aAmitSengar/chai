import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import '../../../../styles/main.css';
import variables from '../../../styles/variables';
import Icons from '../../../../images/icons/dashboard.svg';
//import Monitor from '../../../../images/icons/Monitor.svg';
import Configure from '../../../../images/icons/Configure.svg';
import Users from '../../../../images/icons/users.svg';
import Notify from '../../../../images/icons/bell.svg';
import { Link } from 'react-router-dom';
//import RemoveButton from '../../common/Inputs/Buttons/ActionButtons';
import { hasRoutePermission } from '../../../utils/AuthPermissions'

import SVG from 'react-inlinesvg';

const styles = theme => ({

    drawerPaper: {
        // position: 'relative',
        width: '100px !important',
        // height: '100% !important',
        backgroundColor: '#1B1C20',
        border: 'none',
        overflow: 'hidden',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    },
    listItem: {
        paddingLeft: 0,
        marginBottom: '30%',
        paddingBottom: 20,
        '& p': {
            color: '#c3c3c3'
        }
    },

    menuIcons: {
        height: 40,
        width: 40,
        marginLeft: 'auto',
        '& svg': {
            fill: '#8e8e8e',
            '& path': {
                fill: '#8e8e8e'
            }
        }
    },
    activeIcon: {
        height: 40,
        width: 40,
        marginLeft: 'auto',
        '& svg': {
            fill: variables.white,
            '& path': {
                fill: variables.white
            }
        }
    },
    itemLbl: {
        position: "absolute",
        paddingTop: 60,
        paddingLeft: 22,
        width: '100%',
        textAlign: 'center'
    },
    kpiBox: {
        //borderLeft: '6px solid #328EEB'
        color: variables.lighterGray,
    },
    activeLink: {
        borderLeft: `3px solid ${variables.blue}`,
        color: variables.white,
        '& p': {
            color: variables.white
        }
    },
    toolbar: theme.mixins.toolbar,
});


class NavDrawer extends Component {
    isActive(pathname) {
        if (this.props.location.pathname === pathname) {
            return true;
        }
        return false;
    }
    /**
     * render
     * main render
     */
    render() {
        const { classes } = this.props;
        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: [classes.drawerPaper, 'leftpanel'].join(' '),
                }}
                elevation={0}
            >
                <div className={classes.toolbar} />
                <List>
                    {hasRoutePermission("DASHBOARD") &&
                    <Link to="/home" className={classes.kpiBox} >
                        <ListItem className={[classes.listItem, this.isActive('/home') ? classes.activeLink : ''].join(" ")} >
                            <SVG
                                src={Icons}
                                className={this.isActive('/home') ? classes.activeIcon : classes.menuIcons}
                            >
                            </SVG>
                            <ListItemText className={[classes.itemLbl, 'label'].join(' ')} secondary="Dashboard" />
                        </ListItem>
                    </Link>
                    }
                   
                    {(hasRoutePermission("USERS") || hasRoutePermission("ROLES"))  &&
                    <Link to="/user" className={classes.kpiBox} >
                        <ListItem className={[classes.listItem, this.isActive('/user') ? classes.activeLink : ''].join(" ")} >
                            <SVG
                                src={Users}
                                className={this.isActive('/user') ? classes.activeIcon : classes.menuIcons}
                            >
                            </SVG>
                            <ListItemText className={[classes.itemLbl, 'label'].join(' ')} secondary="Users" />
                        </ListItem>
                    </Link>
                    }
                   
                </List>

            </Drawer>
        )
    }


    /**
     * render
     * landing view based upon props
     */
    renderLanding = () => {
        return (
            <div> {this.props.component} </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        navdrawer: state.navdrawer
    }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, null)(NavDrawer)));