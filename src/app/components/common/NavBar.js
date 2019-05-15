import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import FontAwesomeIcon from "react-fontawesome";
// import DashboardPLVFilter from '../authenticated/Filters/DashboardPLVFilter';
import APITransport from '../../actions/apitransport/apitransport';

import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import TimeFilter from '../authenticated/Filters/TimeFilter';

import '../../../styles/main.css';
import logo from '../../../images/logo.png';
import default_profile from '../../../images/user/user.png'
import variables from '../../styles/variables';
// import MiniDashboard from '../common/MiniDashboard/MiniDashboard';
// import CreateGlobalPLV from '../../actions/globalPLV/createGlobalPLV';
// import UpdateGlobalPLV from '../../actions/globalPLV/updateGlobalPLV';
import Popovers from '../common/Popovers/PopoverNew';
import ManageAccount from './ManageAccount/ManageAccount';
import ConfirmationBox from './ConfirmationBox/ConfirmationBox';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: variables.widget_background,
        borderBottom: '2px solid #343539'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },

    profileImg: {
        width: 35,
        height: 35,
        marginRight: 15,
        cursor: 'pointer'
    },

    locationFilter: {
        padding: theme.spacing.unit,
        margin: `${theme.spacing.unit}px 0`,
        borderRadius: 3,
        marginRight: 15,
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: 152,
        whiteSpace: "nowrap",
        outline: 'none',
        border: '1px solid',
        borderColor: theme.palette.text.primary,
        '&:focus': {
            outline: 'none',
        },

    },
    timeIndicate: {
        marginRight: 15,
        display: "inherit",
        outline: 'none',
        '&:focus': {
            outline: 'none',
        }
    },
    clockIcon: {
        marginRight: 10
    },
    active: {
        border: '1px solid',
        borderColor: theme.palette.text.primary,
    },
    menuItem: {
        color: variables.black
    },
    profileMenuIcon: {
        cursor: 'pointer'
    },
    popover: {
        maxWidth: '100%',
    },
    popoverHeading: {
        fontFamily: variables.primaryFont,
        fontSize: 24,
        margin: 15,
        fontWeight: variables.f_600
    }


});


class NavBar extends Component {

    constructor(props) {
        super(props);
        let list = JSON.parse(sessionStorage.getItem("data"));
        this.state = {
            popoverOpen: false,
            title: "",
            target: 'profile_menu',
            type: "",
            IsOpenManageAccount: false,
            plvSelection: (list) ? list.PLV : [],
            anchorEl: null,
            displayLogoutConfirmBox: false
        };
        this.openPopOver = this.openPopOver.bind(this);
        this.cancelPLV = this.cancelPLV.bind(this);
        this.logout = this.logout.bind(this);
        this.selectPLV = this.selectPLV.bind(this);

    }

    componentDidMount() {
        if (!this.props.globalPLV) {
            let data = JSON.parse(sessionStorage.getItem("data"));
            if (data)
                this.props.CreateGlobalPLV(data);
        }
    }
    openPopOver(title, type, event) {
        this.setState({
            popoverOpen: !this.state.popoverOpen,
            title: title,
            type: type,
            anchorEl: event.currentTarget,
        });
    }

    cancelPLV() {
        this.setState({ popoverOpen: false });
    }

    profileMenu = event => {
        this.cancelPLV();
        this.setState({ popoverOpen: true, });
    }

    manageAccount() {
        this.setState({
            IsOpenManageAccount: !this.state.IsOpenManageAccount,
        });
    }

    getProfilePanel() {
        const { classes } = this.props;
        return [
            <MenuItem key={1} className={classes.menuItem} onClick={this.manageAccount.bind(this)}>
                <FontAwesomeIcon name={"manage-user"} className={"fas fa-user"} />
                &nbsp;Manage Account
            </MenuItem>,
            <MenuItem key={2} className={classes.menuItem} onClick={(event) => this.logout(event)}>
                <FontAwesomeIcon name={"logout"} className={"fas fa-power-off"} />
                &nbsp;Logout
            </MenuItem>

        ]
    }


    logout(event) {
        event.preventDefault();
        this.setState({
            displayLogoutConfirmBox: true
        });
    }
    handleLogoutOkClick(event) {
        localStorage.clear();
        sessionStorage.clear();
        window.location = '/cahi/login';
    }
    handleLogoutCancelClick() {
        this.setState({
            displayLogoutConfirmBox: false
        });
    }

    selectPLV(plvs) {
        this.setState({ plvSelection: plvs });
    }

    selectedPLS() {
        if (this.props.globalPLV) {
            return this.props.globalPLV.reduce((total, item) => {
                return total + (item.status ? 1 : 0)
            }, 0)
        }
        return 0;
    }
    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        })
    }


    handleClick() {
        this.setState({
            IsOpenManageAccount: !this.state.IsOpenManageAccount,
        });
        this.cancelPLV();
    };


    cancelPLV = () => {
        this.setState({
            anchorEl: null,
        });
    };

    updateUser() {
        // this.props.updateUser({
        //     firstName: this.state.firstName,
        //     lastName: this.state.lastName,
        //     email: this.state.email,
        //     mobile: this.state.Mobile
        // });
        // this.handleClick();
    }


    render() {
        const { classes } = this.props;
        let isHome = this.props.location.pathname === '/home';

        return (
            <AppBar position="fixed" className={classes.appBar} elevation={1}  >
                <Toolbar>
                    <Typography  color="inherit" className={classes.flex}>
                        <Link to={`/home`} className={classes.logo}>
                            <img src={logo} alt="COGNIZ" />
                        </Link>
                    </Typography>

                    {/* {isHome ? '' : <MiniDashboard />} */}

                    {/* {isHome ?
                        <div>
                            <Button id="locationModal" className={[classes.locationFilter,].join(' ')} onClick={(event) => this.openPopOver('Select Nodes', 'LOCATION_FILTER', event)}  >
                                Nodes ({this.selectedPLS()})
                            </Button>
                            <Button id="timefilter" className={[classes.locationFilter,].join(' ')} onClick={(event) => this.openPopOver('Select Time', 'TIME_FILTER', event)} >
                                Time
                            </Button>
                        </div> : <div />
                    } */}

                    <Avatar id="profile_menu" alt="COGNIZ_USER" className={classes.profileImg} src={default_profile} onClick={(event) => this.openPopOver('', 'PROFILE_MENU', event)} />

                    <Popovers target={this.state.anchorEl} handleClose={this.cancelPLV}>
                        {this.props.title
                            ?
                            <label className={classes.popoverHeading}>{this.props.title}</label>
                            : null}
                        {this.state.type === 'PROFILE_MENU' &&
                            this.getProfilePanel()
                        }
                        {/* {this.state.type === 'LOCATION_FILTER' &&
                            // <DashboardPLVFilter selectPLV={this.selectPLV} plvSelect={this.state.plvSelection} actionFilter={"DASHBOARD_FILTER"} cancelPLV={this.cancelPLV} />
                        } */}
                        {/* {this.state.type === 'TIME_FILTER' &&
                            // <TimeFilter cancelPLV={this.cancelPLV} />
                        } */}

                    </Popovers>
                    <ManageAccount
                        IsOpen={this.state.IsOpenManageAccount}
                        closeDrawer={this.handleClick.bind(this)}
                        updateUser={this.updateUser.bind(this)}
                    />
                    <ConfirmationBox title={"Logout"}
                        handleOk={this.handleLogoutOkClick.bind(this)}
                        hangleClose={this.handleLogoutCancelClick.bind(this)}
                        okButton={"Logout"}
                        cancelButton={"Cancel"}
                        IsOpen={this.state.displayLogoutConfirmBox}>
                        <p>Are you sure Want to Logout? </p>
                    </ConfirmationBox>
                </Toolbar>
            </AppBar>

        )
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        // updatedPLV: state.updatedPLV,
        // globalPLV: state.globalplv.PLVS
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        // CreateGlobalPLV: CreateGlobalPLV,
        // UpdateGlobalPLV: UpdateGlobalPLV,
        APITransport: APITransport

    }, dispatch)
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NavBar)));
