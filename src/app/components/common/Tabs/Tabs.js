import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import styles from './TabsStyle';
// import SVG from 'react-inlinesvg';
// import removeIcon from '../../../../../images/icons/delete.svg';
// import editIcon from '../../../../../images/icons/edit.svg';
// import detailsIcon from '../../../../../images/icons/more-details.svg'
// import notifyIcon from '../../../../../images/icons/notify.svg'
// import Close from '@material-ui/icons/Close';
// import ArrowForward from '@material-ui/icons/ArrowForward';
//import { Tooltip } from '@material-ui/core';
import hasPermission, { hasRoutePermission } from '../../../utils/AuthPermissions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



class CustomTabs extends React.Component {
    constructor(props) {
        super(props)
        this.state={

        };
    }
    handleClick(event) {
        this.props.handleClick(this.props.value, this.props.target)
    }

    hasPermission(RoleKey, RoleAction) {
        return hasPermission(RoleKey, RoleAction);
    }
    hasRoutePermission(RoleKey) {
        return hasRoutePermission(RoleKey);
    }
    handleChange() {
        this.props.handleChange();
    }
    renderTab(needActionAuth) {
        let { myTabs } = this.props;
        return (<Tabs
            value={this.props.value}
            onChange={this.props.handleChange}
            classes={{
                root: 'tabOutline',
                indicator: 'tabIndicator'
            }}
        >
            {myTabs.map(tab => {
                if (needActionAuth) {
                    let _isPermited = this.hasPermission(tab.RoleKey, tab.RoleAction)
                    if (_isPermited) {
                        return (
                            <Tab
                                disableRipple
                                value={tab.RoleKey + "." + tab.RoleAction}
                                label={tab.name}
                                key={tab.RoleKey + "." + tab.RoleAction}
                            />
                        )
                    } else {
                        return null;
                    }
                } else {
                    let _isPermited = this.hasRoutePermission(tab.RoleKey)
                    if (_isPermited) {
                        return (
                            <Tab
                                disableRipple
                                label={tab.name}
                                key={tab.RoleKey}
                            />
                        )
                    } else {
                        return null;
                    }
                }
            })
            }
        </Tabs>);
    }

    rederSwitch() {
        const { tabType } = this.props;
        switch (tabType) {
            case "SimpleTab":
                return this.renderTab(true)
            case "AuthTab":
                return this.renderTab(false)
            default:
            return null;
        }
    }
    render() {
        return (
            <div>
                {this.rederSwitch()}
            </div>
        )
    }
}

export default withStyles(styles)(CustomTabs);