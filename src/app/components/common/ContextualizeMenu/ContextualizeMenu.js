import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FontAwesomeIcon from "react-fontawesome";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuItems from './MenuItems';
import styles from './Styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DashboardApi from '../../../actions/apis/dashboard';
import APITransport from '../../../actions/apitransport/apitransport';

class ContextualizeMenu extends Component {
    constructor(props) {
        super(props);
        let list = JSON.parse(sessionStorage.getItem("data"));
        this.state = {
            popoverOpen: false,
            title: "",
            target: 'locationModal_menu',
            type: "",
            plvSelection:list.PLV
        };
        this.cancelPLV = this.cancelPLV.bind(this);
        this.selectPLV = this.selectPLV.bind(this);
    }
    componentDidMount() {

        let apiObj = new DashboardApi(10000, true);
        this.props.APITransport(apiObj);
    }

    handleChange(route){
        if(this.props.location.pathname !== route) {
            this.props.history.push(route)
        }
    };

    openPopOver(title, target) {
        this.setState({
            popoverOpen: !this.state.popoverOpen,
            title: title,
            target: target,
            profileSelect: null
        });
    }

    getData(level) {

        let kpi = (this.props.plvfilter.KPI && this.props.plvfilter.KPI.length) ? this.props.plvfilter.KPI : this.props.kpi;
        let data = kpi.filter(ele => { return ele.name === level });
        if (!data) {
            return { "name": level, "color": "green", "count": 0 }
        }
        return data[0];
    }

    cancelPLV() {
        this.setState({ popoverOpen: false });
    }
    
    selectPLV(plvs) {
        this.setState({plvSelection:plvs});
    }

    selectedPLS() {
        let list = JSON.parse(sessionStorage.getItem("data"));
        let selected = this.state.plvSelection;
        let listItems = (this.state.plvSelection)?this.state.plvSelection:list.PLV;
        return listItems.length;
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        const counter = this.props.counter;

        return (
            <div className={classes.root}>
                <ExpansionPanel className={classes.contextualTab}>
                    <ExpansionPanelSummary expandIcon={<FontAwesomeIcon name={"menu-expand"} className={"fas fa-caret-down"} />}>
                        <Tabs className={classes.tabRoot}>
                            <Tab label="KPI" className={[this.props.location.pathname === '/kpi/critical' ? classes.active : classes.inactive, classes.item].join(' ')} onClick={() => this.handleChange('/kpi/critical')}/>
                            <Tab label="EVENTS" className={[this.props.location.pathname === '/events' ? classes.active : classes.inactive, classes.item].join(' ')} onClick={() => this.handleChange('/events')}/>
                            <Tab label="ALERTS" className={[this.props.location.pathname === '/kpi/alerts' ? classes.active : classes.inactive, classes.item].join(' ')} onClick={() => this.handleChange('/alerts')} />
                            <Tab label="TASKS" className={[this.props.location.pathname === '/kpi/tasks' ? classes.active : classes.inactive, classes.item].join(' ')} onClick={() => this.handleChange('/tasks')} />
                            <Tab label="HEATMAP" className={[this.props.location.pathname === '/heatmap' ? classes.active : classes.inactive, classes.item].join(' ')} onClick={() => this.handleChange('/heatmap')} />
                        </Tabs>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expansionPanel}>
                        {counter.KPI.length !== 0 &&
                            <div className={[classes.menuContainer,classes.menuContainerDisplay].join(' ')}>
                                <div className={classes.menuItem}>
                                    <List>
                                        <MenuItems title="CRITICAL" count={this.getData('CRITICAL').count} status="critical" icon={true} />
                                        <Divider />
                                        <MenuItems title="MAJOR" count={this.getData('MAJOR').count} status="major" icon={true} />
                                        <Divider />
                                        <MenuItems title="MINOR" count={this.getData('MINOR').count} status="minor" icon={true} />
                                        <Divider />
                                        <MenuItems title="WARNING" count={this.getData('HEALTHY').count} status="warning" icon={true} />

                                    </List>
                                </div>
                                <div className={classes.verticalLine}></div>

                                <div className={classes.menuItem}>
                                    <List>
                                        <MenuItems title="LOGINS" count="10K" />
                                        <Divider />
                                        <MenuItems title="CONFIG CHANGES" count={62} />
                                        <Divider />
                                        <MenuItems title="COUNTERS" count={109} />
                                        <Divider />
                                        <MenuItems title="FILES" count={382} />
                                        <Divider />
                                        <MenuItems title="HTTP" count={72} />
                                        <Divider />
                                        <MenuItems title="MML" count={23} />
                                    </List>
                                </div>
                                <div className={classes.verticalLine}></div>
                                <div className={classes.menuItem}>
                                    <List>
                                        <MenuItems title="CRITICAL" count={109} status="critical" icon={true} />
                                        <Divider />
                                        <MenuItems title="MAJOR" count={72} status="major" icon={true} />
                                        <Divider />
                                        <MenuItems title="MINOR" count={39} status="minor" icon={true} />
                                        <Divider />
                                        <MenuItems title="WARNING" count={16} status="warning" icon={true} />
                                    </List>
                                </div>
                                <div className={classes.verticalLine}></div>
                                <div className={classes.menuItem}>
                                    <List>
                                        <MenuItems title="FAILED" count={3} status="warning" icon={true} />
                                        <Divider />
                                        <MenuItems title="EXECUTED" count={209} status="success" icon={true} />
                                    </List>
                                </div>
                                <div className={classes.menuItem}>
                                </div>
                            </div>
                        }
                        <div className={classes.clearFix}></div>
                        <Divider />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        kpi: state.dashboard.KPI,
        counter: state.dashboard,
        events: state.dashboard.EVENTS,
        plvfilter: state.plvfilter,
        apistatus: state.apistatus
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        APITransport: APITransport
    }, dispatch)
}
ContextualizeMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ContextualizeMenu)));