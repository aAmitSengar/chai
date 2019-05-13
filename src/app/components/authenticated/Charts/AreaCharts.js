import React, {
    Component
} from 'react';
// import {
//     LineChart,
//     Line,
//     AreaChart,
//     Area,
//     Brush,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip
// } from 'recharts';
import {
    Paper,
    Typography
} from '@material-ui/core';
import {
    withStyles
} from '@material-ui/core/styles';
import styles from './Styles';
import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more';

class AreaCharts extends Component {

    constructor(props) {
        super(props);
        HighchartsMore(ReactHighcharts.Highcharts)
    }

    handleClick(data, index) {

    }
    chartre() {
        const { graphData, kpiDetailData, islegend, isYAccess, name, height } = this.props;
        ReactHighcharts.Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        var opts = {
            chart: {
                height: height,
                type: 'area',
                renderTo: 'container',
                zoomType: 'xy',
                marginTop: 50,
                // backgroundColor: {
                //     linearGradient: [0, 0, 500, 500],
                //     stops: [
                //         [0, 'rgb(255, 255, 255)'],
                //         [1, 'rgb(200, 200, 255)']
                //     ]
                // },
                color: 'red'
            },
            legend: {
                align: 'center',
                verticalAlign: 'top',
                floating: true,
                x: 0,
                y: 0
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: isYAccess
                }
            },
            tooltip: {
                tooltip: {
                    pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
                },
                crosshairs: true,
                shared: true,
            },
            series: [{
                "name": kpiDetailData.KPI_NAME || name,
                showInLegend: islegend && true,

                "type": "spline",
                "data": graphData,
                "zIndex": 0,
                "zoneAxis": "x",
                zones: [{
                    value: 1364832000000,
                    color: '#2CACC4'
                },
                {
                    color: '#C59F24'
                }]
            },
            {
                name: "Range",
                "type": "arearange",
                lineWidth: 0,
                "linkedTo": ":previous",
                "zIndex": 0,
                "fillOpacity": 0.3,
                color: '#C59F24'
            },
            ],
            credits: {
                enabled: false
            },
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500,
                        maxHeight: 300
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom',
                            enabled: false
                        }
                    }
                }]
            }
        }
        if (graphData && graphData.length) {
            return <ReactHighcharts config={opts} ref="chart" > </ReactHighcharts>
        }
        return '';

    }

    render() {
        const { classes, title } = this.props;
        return (<Paper className={classes.areaContainer} elevation={4} > {
            title !== "" ?
                <Typography className={classes.title} variant="headline" component="div" >
                    {title} </Typography> :
                null
        } {this.chartre()} </Paper>
        );
    }

}

export default withStyles(styles)(AreaCharts);;