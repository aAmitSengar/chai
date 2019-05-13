import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from 'reactstrap';
import styles from './Styles';
import { Divider } from '@material-ui/core';
import more from '../../../../images/icons/more.svg';
//import export_data from '../../../../images/icons/export-data.svg';
//import edit_KPI from '../../../../images/icons/edit.svg';
import SVG from 'react-inlinesvg';
import Popovers from '../Popovers/Popovers';
import RemoveButton from '../../common/Inputs/Buttons/ActionButtons';


class ActionPopover extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }
    exportData(event) {
        this.props.exportData(event)
    }
    editKPI(event) {

        if (this.props.kpiDetail && this.props.kpiDetail._id) {
            var sessionObj = {
                KPI_ID: this.props.kpiDetail._id,
                KPI_CATEGORY: this.props.kpiDetail.CATEGORY,
                KPI_NAME: this.props.kpiDetail.KPI_NAME,
                // KPI_SERVICE_NAME:this.props.kpiDetail.,
                // KPI_STATUS:this.props.kpiDetail.,
                KPI_LEVEL: this.props.kpiDetail.LEVEL,
                KPI_DURATION: this.props.kpiDetail.TYPE,
                KPI_NODEIP: this.props.kpiDetail.IP_ADDRESS,
                KPI_VENDOR: this.props.kpiDetail.VENDOR_NAME,
                KPI_LOCATION: this.props.kpiDetail.LOCATION,
                KPI_PRODUCT: this.props.kpiDetail.PRODUCT_NAME,
                // KPI_EMAIL:this.props.kpiDetail.,
                // KPI_SERVICE_COMPONENT: this.props.kpiDetail.,
                // OPID:this.props.kpiDetail.,
                KPI_FORMULA: this.props.kpiDetail.KPI_FORMULA,
                KPI_TIME: this.props.kpiDetail.time,
                PLV: this.props.kpiDetail.PLV
            }
            sessionStorage.setItem('kpiObj', JSON.stringify(sessionObj));
            window.location = `/kpibuilder/${sessionObj.KPI_ID}`;
        }

    }
    others(event) {

    }

    renderActions() {
        const { classes } = this.props;
        var actionMethods = (<Popovers placement={"bottom-end"} popoverOpen={this.state.popoverOpen} target="PopoverAction" toggle={this.toggle}>
            <div className={classes.container}>
            <RemoveButton buttonType={"MultiActionExport"} text={"Export Data"} RoleKey={"KPI"} RoleAction={"EXPORT"} handleClick={this.exportData.bind(this)} />
                {/* <Button onClick={this.exportData.bind(this)} className={classes.actionButton}>
                    <SVG src={export_data} className={classes.Actionmenus} > </SVG>
                    &nbsp;    Export Data
                </Button> */}
                <Divider classes={{
                    inset: false,
                    root: classes.dividerClass
                }} />
                  <RemoveButton buttonType={"MultiActionEdit"} text={"Edit KPI Formula"} RoleKey={"KPI"} RoleAction={"EDIT"} handleClick={this.exportData.bind(this)} />
                {/* <Button onClick={this.editKPI.bind(this)} className={classes.actionButton}>
                    <SVG src={edit_KPI} className={classes.Actionmenus} > </SVG>
                    &nbsp; Edit KPI Formula 
                </Button> */}
                <Divider classes={{
                    inset: false,
                    root: classes.dividerClass
                }} />
            </div>
        </Popovers>);
        return actionMethods;
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.leftMarginForAction}>
                <Button className={classes.button} id="PopoverAction" onClick={this.toggle}>
                    <SVG src={more}
                        className={classes.ActionmenuIcons}
                    >
                        :
                    </SVG>
                    <span>&nbsp;</span>
                </Button>
                {this.state.popoverOpen ? this.renderActions() : null}
            </div>
        );
    }
}

export default withStyles(styles)(ActionPopover);