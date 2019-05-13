import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import styles from './Styles';
// import variables from '../../styles/variables';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DashboardApi from '../../actions/apis/dashboard';
import APITransport from '../../actions/apitransport/apitransport';
import BusyIndicator from '../common/BusyIndicator';
import Toast from '../common/Toast';

class Home extends Component {

    componentDidMount() {
        // let apiObj = new DashboardApi(10000, true);
        // this.props.APITransport(apiObj);
    }

    getData(level) {

        // let kpi = (this.props.plvfilter.KPI && this.props.plvfilter.KPI.length) ? this.props.plvfilter.KPI : this.props.kpi;

        // let data = kpi.filter(ele => { return ele.name === level });
        // if (!data) {
        //     return { "name": level, "color": "green", "count": 0 }
        // }
        // return data[0];
         return { "name": level, "color": "green", "count": 0 }
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const { classes } = this.props;
        return (
            <div>
                <BusyIndicator progress={this.props.apistatus.progress} />
                <Toast show={this.props.apistatus.error} message={this.props.apistatus.message} />
                <main >
                    <Grid container spacing={24}>
                       
                    </Grid>
                </main>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        // kpi: state.dashboard.KPI,
        // plvfilter: state.plvfilter,
        // resource: state.dashboard.RESOURCES,
        // events: state.dashboard.EVENTS,
        // tasks: state.dashboard.TASKS,
        // alerts: state.dashboard.ALERTS,
        apistatus: state.apistatus,
        // globalPLV: state.globalplv.PLVS
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        APITransport: APITransport,
        // CreateGlobalPLV: CreateGlobalPLV
    }, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home));