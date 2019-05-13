import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from './ActionButtonsStyles';
import SVG from 'react-inlinesvg';
import removeIcon from '../../../../../images/icons/delete.svg';
import editIcon from '../../../../../images/icons/edit.svg';

import detailsIcon from '../../../../../images/icons/more-details.svg'
import notifyIcon from '../../../../../images/icons/notify.svg'
import Close from '@material-ui/icons/Close';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { Tooltip } from '@material-ui/core';
import hasPermission from '../../../../utils/AuthPermissions';
import AddUserButton from '../../../../../images/icons/plus-circle.svg';
import exportData from '../../../../../images/icons/export-data.svg';
import exportDataIcon from '../../../../../images/icons/export-data.svg';
import Delete from '@material-ui/icons/Delete';
import export_data from '../../../../../images/icons/export-data.svg';
import edit_KPI from '../../../../../images/icons/edit.svg';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icons from '../../../../../images/icons/dashboard.svg';
import acknowledge from '../../../../../images/icons/acknowledge.svg'
import notify from '../../../../../images/icons/notify.svg'
import Configure from '../../../../../images/icons/Configure.svg';
import Users from '../../../../../images/icons/users.svg';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';



class RemoveButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kpiState: false,
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            kpiState: this.props.kpiState
        });
        // if (nextProps.kpiState !== this.props.kpiState) {
        //     this.setState({
        //         kpiState: this.props.kpiState
        //     });
        // }
    }

    handleClick(event) {
        this.props.handleClick(this.props.value, this.props.target)
    }

    hasPermission() {
        const { RoleKey, RoleAction } = this.props;
        return hasPermission(RoleKey, RoleAction);
    }

    renderRemoveButton() {
        const { classes } = this.props;
        return (
            <Tooltip title="Remove" classes={{ tooltip: classes.lightTooltip }}>
                <div>
                    <Button className={classes.cancelButton} onClick={this.handleClick.bind(this)}>
                        <SVG src={removeIcon} className={classes.Actionmenus}> Remove </SVG>
                    </Button>
                </div>
            </Tooltip>
        );
    }

    renderEditButton() {
        const { classes } = this.props;
        return (
            <Tooltip title="Edit" classes={{ tooltip: classes.lightTooltip }}>
                <div>
                    <Button className={classes.cancelButton} onClick={this.handleClick.bind(this)}>
                        <SVG src={editIcon} className={classes.Actionmenus}> Edit </SVG>
                    </Button>
                </div>
            </Tooltip>
        );
    }
    renderDetailsButton() {
        const { classes } = this.props;
        return (
            <Tooltip title="Details" classes={{ tooltip: classes.lightTooltip }}>
                <div>
                    <Button className={classes.cancelButton} onClick={this.handleClick.bind(this)}>
                        <SVG src={detailsIcon} className={classes.Actionmenus}> Details </SVG>
                    </Button>
                </div>
            </Tooltip>
        );
    }
    renderConnectedButton() {
        const { classes } = this.props;
        return (
            <Tooltip title="Pending" classes={{ tooltip: classes.lightTooltip }}>
                <div>
                    <Button className={classes.cancelButton} onClick={this.handleClick.bind(this)}>
                        <Close className={[classes.closeClassRed, classes.Actionmenus].join(' ')} />
                    </Button>
                </div>
            </Tooltip>
        );
    }
    renderPendingButton() {
        const { classes } = this.props;
        return (
            <Tooltip title="Connect" classes={{ tooltip: classes.lightTooltip }}>
                <div>
                    <Button className={classes.cancelButton} onClick={this.handleClick.bind(this)}>
                        <ArrowForward className={[classes.closeClassGreen, classes.Actionmenus].join(' ')} />
                    </Button>
                </div>
            </Tooltip>
        );
    }
    renderNotifyButton() {
        const { classes, id } = this.props;
        return (
            <Tooltip title="Notify" classes={{ tooltip: classes.lightTooltip }}>
                <div>
                    <Button className={classes.cancelButton} id={id || "notify_id"} onClick={this.handleClick.bind(this)}>
                        <SVG src={notifyIcon} className={classes.Actionmenus} > Notify </SVG>
                    </Button>
                </div>
            </Tooltip>
        );
    }
    renderDefaultAddButton() {
        const { classes, text, disabled } = this.props;
        return (
            <Tooltip title={text} classes={{ tooltip: classes.lightTooltip }}>
                <div>
                    <Button disabled={disabled} className={classes.actionButton} onClick={this.handleClick.bind(this)}>
                        {text} <SVG src={AddUserButton} className={classes.Actionmenus_defaultAdd}>{text}</SVG>
                    </Button>
                </div>
            </Tooltip>
        );
    }
    renderDefaultButton() {
        const { classes, text, disabled } = this.props;
        return (
            <Tooltip title={text} classes={{ tooltip: classes.lightTooltip }}>
                <div>
                    <Button disabled={disabled} className={classes.actionButton} onClick={this.handleClick.bind(this)}>
                        {text}
                    </Button>
                </div>
            </Tooltip>
        );
    }
    renderDownloadAgentButton() {
        const { classes, text, disabled } = this.props;
        return (
            <Tooltip title={text} classes={{ tooltip: classes.lightTooltip }}>
                <div>
                    <Button disabled={disabled} className={classes.actionButton_download} onClick={this.handleClick.bind(this)}>
                        {text} <SVG src={exportData} className={classes.Actionmenus_download}>{text}</SVG>
                    </Button>
                </div>
            </Tooltip>
        );
    }
    renderExportDataButton() {
        const { classes, text, disabled } = this.props;
        return (
            <Tooltip title={text} classes={{ tooltip: classes.lightTooltip }}>
                <div>
                    <Button disabled={disabled} className={classes.actionButton_exportdata} onClick={this.handleClick.bind(this)}>
                        <SVG src={exportDataIcon} className={classes.actionmenus_exportdata}>{text}</SVG>
                        {text}
                    </Button>
                </div>
            </Tooltip>
        );
    }
    renderMultipleDeleteButton() {
        const { classes, text, disabled } = this.props;
        return (
            <Tooltip title={text} classes={{ tooltip: classes.lightTooltip }}>
                <div>
                    <Button disabled={disabled} className={classes.actionButton_exportdata} onClick={this.handleClick.bind(this)}>
                        <Delete className={[classes.actionmenus_exportdata].join(' ')} />
                        {text}
                    </Button>
                </div>
            </Tooltip>
        );
    }
    renderMultiActionEditButton() {
        const { classes, text, disabled } = this.props;
        return (
            <Tooltip title={text} classes={{ tooltip: classes.lightTooltip }}>
                <div>
                    <Button disabled={disabled} className={classes.actionButton_multiEdit} onClick={this.handleClick.bind(this)}>
                        <SVG src={edit_KPI} className={classes.actionmenus_multiEdit}>{text}</SVG>
                        {text}
                    </Button>
                </div>
            </Tooltip>
        );
    }
    renderMultiActionExportButton() {
        const { classes, text, disabled } = this.props;
        return (
            <Tooltip title={text} classes={{ tooltip: classes.lightTooltip }}>
                <div>
                    <Button disabled={disabled} className={classes.actionButton_multiexportdata} onClick={this.handleClick.bind(this)}>
                        <SVG src={export_data} className={classes.actionmenus_multiexportdata}>{text}</SVG>
                        {text}
                    </Button>
                </div>
            </Tooltip>
        );
    }

    renderack_KPIButton() {
        const { classes, text, disabled } = this.props;
        return (<Tooltip title={text} classes={{ tooltip: classes.lightTooltip }}>
            <div>  <Button disabled={disabled} className={classes.KPIButton} onClick={this.handleClick.bind(this)}>
                <SVG src={acknowledge} className={classes.menuIcons_KPIButton}>{text}</SVG>
                {text}
            </Button>
            </div>
        </Tooltip>)
    }
    renderNotify_KPIButton() {
        const { classes, text, disabled } = this.props;
        return (<Tooltip title={text} classes={{ tooltip: classes.lightTooltip }}>
            <div> <Button disabled={disabled} className={classes.Notify_KPIButton} onClick={this.handleClick.bind(this)}>
                <SVG src={notify} className={classes.menuIcons_Notify_KPI}>{text}</SVG>
                {text}
            </Button>
            </div>
        </Tooltip>)
    }
    renderLeftMenuHomeButton() {
        const { classes, text, isActive } = this.props;
        return (
            // <Tooltip title={text} classes={{ tooltip: classes.lightTooltip }}>
            // eslint-disable-next-line jsx-a11y/aria-role
            <ListItem role="li" className={[classes.listItem, isActive ? classes.activeLink : ''].join(" ")} >
                <Link to="/home" className={classes.kpiBox} >
                    <SVG
                        src={Icons}
                        className={isActive ? classes.activeIcon : classes.menuIcons}
                    >
                    </SVG>
                    <ListItemText className={[classes.itemLbl, 'label'].join(' ')} secondary={text} />
                </Link>
            </ListItem>

            // </Tooltip>
        );
    }
    renderLeftMenuConfigureButton() {
        const { classes, text, isActive } = this.props;
        return (
            <Tooltip title={text} classes={{ tooltip: classes.lightTooltip }}>

                <ListItem className={[classes.listItem, isActive ? classes.activeLink : ''].join(" ")} >
                    <Link to="/home" className={classes.kpiBox} >
                        <SVG
                            src={Configure}
                            className={isActive ? classes.activeIcon : classes.menuIcons}
                        >
                        </SVG>
                        <ListItemText className={[classes.itemLbl, 'label'].join(' ')} secondary={text} />
                    </Link>    </ListItem>

            </Tooltip>
        );
    }
    renderLeftMenuUserButton() {
        const { classes, text, isActive } = this.props;
        return (
            <Tooltip title={text} classes={{ tooltip: classes.lightTooltip }}>

                <ListItem className={[classes.listItem, isActive ? classes.activeLink : ''].join(" ")} >
                    <Link to="/home" className={classes.kpiBox} >
                        <SVG
                            src={Users}
                            className={isActive ? classes.activeIcon : classes.menuIcons}
                        >
                        </SVG>

                        <ListItemText className={[classes.itemLbl, 'label'].join(' ')} secondary={text} />
                    </Link>
                </ListItem>

            </Tooltip>
        );
    }

    renderSwitch_KPIButton() {
        const { classes, isChecked } = this.props;
        return (
            // <Tooltip title="Status" classes={{ tooltip: classes.lightTooltip }}>
            <Switch
                classes={{
                    bar: classes.barClass,
                    //switchBase: classes.base, 
                    iconChecked: classes.check
                }}
                checked={isChecked}
                onChange={this.handleClick.bind(this)}
                //value="checked"
                color="primary"
            />
            // </Tooltip>
        );
    }

    renderDefaultACKButton() {
        const { classes, text, disabled } = this.props;
        return (
            <Tooltip title={text} classes={{ tooltip: classes.lightTooltip }}>
                <div>
                    <Button disabled={disabled} className={classes.actionButton_exportdata} onClick={this.handleClick.bind(this)}>
                        <SVG src={acknowledge} className={classes.menuIcons_KPIButton}>{text}</SVG>
                        {text}
                    </Button>
                </div>
            </Tooltip>
        );
    }
    rederSwitch() {
        const { buttonType } = this.props;
        switch (buttonType) {
            case "remove":
                return this.hasPermission() ? (
                    <div>{this.renderRemoveButton()} </div>
                ) : null
            case "edit":
                return this.hasPermission() ? (
                    <div>{this.renderEditButton()}</div>
                ) : null
            case "details":
                return this.hasPermission() ? (
                    <div>{this.renderDetailsButton()}</div>
                ) : null
            case "notify":
                return this.hasPermission() ? (
                    <div>{this.renderNotifyButton()}</div>
                ) : null
            case "connected":
                return this.hasPermission() ? (
                    <div>{this.renderConnectedButton()}</div>
                ) : null
            case "pending":
                return this.hasPermission() ? (
                    <div>{this.renderPendingButton()}</div>
                ) : null
            case "AddButton":
                return this.hasPermission() ?
                    this.renderDefaultAddButton()
                    : null
            case "DownloadAgent":
                return this.hasPermission() ?
                    this.renderDownloadAgentButton()
                    : null
            case "ExportData":
                return this.hasPermission() ?
                    this.renderExportDataButton()
                    : null
            case "MultiDelete":
                return this.hasPermission() ?
                    this.renderMultipleDeleteButton()
                    : null
            case "MultiActionEdit":
                return this.hasPermission() ?
                    this.renderMultiActionEditButton()
                    : null
            case "MultiActionExport":
                return this.hasPermission() ?
                    this.renderMultiActionExportButton()
                    : null
            case "DefaultButton":
                return this.hasPermission() ?
                    this.renderDefaultButton()
                    : null
            case "DefaultACKButton":
                return this.hasPermission() ?
                    this.renderDefaultACKButton()
                    : null
            // case "LeftMenuHome":
            //     return this.hasPermission() ?
            //         this.renderLeftMenuHomeButton()
            //         : null
            // case "LeftMenuConfigure":
            //     return this.hasPermission() ?
            //         this.renderLeftMenuConfigureButton()
            //         : null
            // case "LeftMenuUser":
            //     return this.hasPermission() ?
            //         this.renderLeftMenuUserButton()
            //         : null
            case "Notify_KPI":
                return this.hasPermission() ?
                    this.renderNotify_KPIButton()
                    : null
            case "ack_KPI":
                return this.hasPermission() ?
                    this.renderack_KPIButton()
                    : null
            case "switch":
                return this.hasPermission() ?
                    this.renderSwitch_KPIButton()
                    : null
            default:
                return null;
                // break;
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

export default withStyles(styles)(RemoveButton);