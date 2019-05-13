import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './UserInfoStyle';
import Drawers from '../../../common/drawers/drawers'
import { Divider } from '@material-ui/core';
import modalcloseIcon from '../../../../../images/icons/modal-close.svg';
import UserLogo from '../../../../../images/user/user.svg'
import SVG from "react-inlinesvg";
import _ from 'lodash';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        // this.state = {

        // }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.closeDrawer();
    }
    svgWrapper = ({ dangerouslySetInnerHTML, className }) => {
        return (
            <span
                onClick={this.handleClick}
                dangerouslySetInnerHTML={dangerouslySetInnerHTML}
                className={className}
            />
        );
    }
    mapPrivilages(infoData, roles) {
        const { classes } = this.props;
        var lst = [];
        var data = _.chain(roles).filter(item => item.name === infoData.Role)
            .map(item => item.permissions).first().value()
        if (typeof data === 'string') {
            lst = _.chain(roles).filter(item => item.name === infoData.Role)
                .map(item => JSON.parse(item.permissions)).flatten()
                .map(item => item.privileges).flatten()
                .map(item => {
                    if (item.isActive) {
                        return (<span key={item.name} className={classes.displayArray}>{item.name}</span>)
                    } return null
                }).compact()
                .value()
        } else {
            lst = <span className={classes.displayArray}>{"No Privilages"}</span>
        }
        return lst;
    }

    render() {
        const { classes, IsOpen, infoData, roles } = this.props
        return (
            <Drawers open={IsOpen} anchor={"right"} closeDrawer={this.handleClick}>
                {infoData && Object.keys(infoData).length > 0
                    ?
                    <div className={classes.info}>
                        <div className={classes.closeDiv}>
                            <SVG src={modalcloseIcon} className={classes.CloseButton} wrapper={this.svgWrapper}>
                                Close
                        </SVG>
                        </div>
                        <div className={classes.headContainer}>
                            <div className={classes.UserImageDiv}>
                                <SVG src={UserLogo} className={classes.userImage}>
                                    User
                            </SVG>
                            </div>
                            <div className={classes.userDetail}>
                                <h3 className={classes.UserName}>{infoData.FirstName + ' ' + infoData.LastName || 'Pheil Dave'}</h3>
                                <span className={classes.RightLabel}>{infoData.Mobile || 'XXXXXXXXXX'}</span>
                            </div>
                        </div>

                        <Divider classes={{
                            inset: false,
                            root: classes.dividerClass
                        }} />
                        <div className={classes.listDivs}>
                            <div className={classes.detail}>
                                <span className={classes.LeftLabel}>Role: </span>
                                <span className={classes.RightLabel}>{infoData.Role || 'no role found'}</span>
                            </div>
                            <div className={classes.detail}>
                                <span className={classes.LeftLabel}>Description: </span>
                                <span className={classes.RightLabel}>{infoData.Description || 'no description found'}</span>
                            </div>
                        </div>
                        {/* <div className={classes.listDivs}>
                            <div className={classes.detail}>
                                <span className={classes.LeftLabel}>Managed By: </span>
                                <span className={classes.RightLabel}>{_.join(infoData.ManagedBy, ', ') || 'not found'}</span>
                            </div>
                            <div className={classes.detail}>
                                <span className={classes.LeftLabel}>Manager For: </span>
                                <span className={classes.RightLabel}>{_.join(infoData.ManagerFor, ', ') || 'not found'}</span>
                            </div>
                        </div> */}
                        <Divider classes={{
                            inset: false,
                            root: classes.dividerClass
                        }} />
                        <div className={classes.listDivsPrev}>
                            <h3 className={classes.LeftLabel}>Privilages</h3>
                            {
                                this.mapPrivilages(infoData, roles)
                            }


                        </div>
                        <Divider classes={{
                            inset: false,
                            root: classes.dividerClass
                        }} />
                        <div className={classes.listDivsPrev}>
                            <h3 className={classes.LeftLabel}>Nodes Managed</h3>
                            {_.map(infoData.PLV, function (k, v) {
                                return <span key={v} className={classes.displayArray}>{_.join(k, ', ') || 'not found'}</span>
                            })}
                        </div>
                    </div>
                    :
                    <div className={classes.info}>
                        No Data
            </div>
                }

            </Drawers>
        )
    }
}

export default withStyles(styles)(UserInfo);
