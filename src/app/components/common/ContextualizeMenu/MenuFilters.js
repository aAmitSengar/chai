import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './MenuFilterStyle';
import Button from '@material-ui/core/Button';
import dropDownLogo from '../../../../images/icons/arrow-down.png'
//import Popovers from '../../common/Popovers/Popovers';
import KpiReportTimeFilter from '../../authenticated/Filters/KpiReportTimeFilter';
import KpiLevelFilter from '../../authenticated/Filters/KpiLevelFilter';
import dispatchKpiLevelFilterCount from '../../../actions/kpiFilters/KpiLevelFilterCount';
import UpdateDashboardUISection from '../../../actions/apis/dashboard/blocks';
import APITransport from '../../../actions/apitransport/apitransport';
//import DashboardApi from '../../../actions/apis/dashboard';
import PopoverNew from '../../common/Popovers/PopoverNew';

class MenuFilters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            popoverOpen: false,
            title: "",
            target: 'KPI_LEVEL_FILTER',
            type: "",
            breachLevelStatusCount: [],
            breachLevel: ['CRITICAL', 'MAJOR', 'MINOR', 'HEALTHY'],
            priorityLevel: ['HIGH', 'MEDIUM', 'LOW'],
            anchorEl: null
        };
        this.cancelPLV = this.cancelPLV.bind(this);
    }
 
    openPopOver(title, target, type,event) {
        this.setState({
            popoverOpen: !this.state.popoverOpen,
            title: title,
            target: target,
            type: type,
            anchorEl: event.currentTarget,
        });
        if (type === 'LEVEL_FILTER') {
            this.props.KPILEVELFILTERCOUNT(this.props.kpiLevel)
        }
    }

    cancelPLV() {
        this.setState({ popoverOpen: false });
    }
    cancel() {
        this.setState({anchorEl: null});
    }
    cancelPoppover(isOpen) {
        this.setState({ popoverOpen: isOpen });
    }
    render() {
        let classes = this.props.classes;
        return (
            <div className={classes.menuFilter}>
                <Button className={classes.color} id={this.props.target} onClick={(event) => this.openPopOver(this.props.filterTitle, this.props.target, this.props.filterType,event)} >
                    <div className={classes.buttnCnt}>
                        <p className={classes.filterTitle}>
                            {this.props.filterTitle}
                        </p>
                        <p className={classes.filterSubTitle}>
                            {this.props.filterSubTitle}
                            <img src={dropDownLogo} className={classes.plvFilterIcon} alt="icon" />
                        </p>
                    </div>
                </Button >
                {/* <Popovers title={this.state.title} popoverOpen={this.state.popoverOpen} target={this.state.target} cancelPoppover={this.cancelPoppover.bind(this)}>
                    {
                        this.state.type === 'REPORTED_TIME' && <KpiReportTimeFilter cancelPLV={this.cancelPLV} filterType='KPI_REPORTING_FILTER'
                            handleReportingTimeFilter={this.props.handleReportingTimeFilter} />
                    }
                    {
                        this.state.type === 'LEVEL_FILTER' &&
                        <KpiLevelFilter
                            levelType='LEVEL_FILTER'
                            levels={this.state.priorityLevel}
                            handleUserKpiLevelFiltering={this.props.handleUserKpiLevelFiltering}
                            data={this.props.data} />
                    }
                    {
                        this.state.type === 'BREACH_LEVEL_FILTER' &&
                        <KpiLevelFilter
                            levels={this.state.breachLevel}
                            handleBreachLevelFilter={this.props.handleBreachLevelFilter}
                            levelType='BREACH_LEVEL_FILTER'
                            data={this.props.data} />
                    }
                </Popovers> */}
                <PopoverNew target={this.state.anchorEl} handleClose={this.cancel.bind(this)}>
                    <label className={classes.popoverHeading}>{this.state.title}</label>
                    {
                        this.state.type === 'REPORTED_TIME' && <KpiReportTimeFilter cancelPLV={this.cancel.bind(this)} filterType='KPI_REPORTING_FILTER'
                            handleReportingTimeFilter={this.props.handleReportingTimeFilter} />
                    }
                    {
                        this.state.type === 'LEVEL_FILTER' &&
                        <KpiLevelFilter
                            levelType='LEVEL_FILTER'
                            levels={this.state.priorityLevel}
                            handleUserKpiLevelFiltering={this.props.handleUserKpiLevelFiltering}
                            data={this.props.data} />
                    }
                    {
                        this.state.type === 'BREACH_LEVEL_FILTER' &&
                        <KpiLevelFilter
                            levels={this.state.breachLevel}
                            handleBreachLevelFilter={this.props.handleBreachLevelFilter}
                            levelType='BREACH_LEVEL_FILTER'
                            data={this.props.data} />
                    }
                </PopoverNew>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dashboard: state.dashboard,
        globalPLV: state.globalplv.PLVS,
        kpiLevel: state.kpiLevel,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        UpdateDashboardUISection: UpdateDashboardUISection,
        APITransport: APITransport,
        KPILEVELFILTERCOUNT: dispatchKpiLevelFilterCount
    }, dispatch)
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MenuFilters));
