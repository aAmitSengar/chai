import React, { Component } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles';
import { Paper, Typography } from '@material-ui/core';
const colorBreakPoint = 3000;
class LineCharts extends Component {

    constructor(props) {
        super(props);
    }
    handleClick(data, index) {
        // this.setState({
        //     activeIndex: index
        // });
    }

    render() {
        const { data, graphName } = this.props.SubGraphsData;
        const { classes, title, IsYAxis } = this.props;
        const { min, max } = data.reduce((result, dataPoint) => ({
            min: (dataPoint.pv < result.min || result.min === 0) ? dataPoint.pv : result.min,
            max: (dataPoint.pv > result.max || result.max === 0) ? dataPoint.pv : result.max,
        }), { min: 0, max: 0 });
        const colorBreakPointPercentage = `${(1 - ((colorBreakPoint - min) / (max - min))) * 100}%`;

        return (
            <Paper className={[classes.areaContainer1, IsYAxis ? null : classes.marginLeft].join(' ')}>
                {title !== "" ?
                    <Typography variant="headline" component="div" className={classes.title}>
                        <level className={classes.title}>{graphName || 'Chart'}</level>
                    </Typography>
                    : null}
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} onClick={this.handleClick} className={classes.chartStyle}>
                    <defs>
                        <linearGradient id="colorUv" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="green" />
                            <stop offset={colorBreakPointPercentage} stopColor="green" />
                            <stop offset={colorBreakPointPercentage} stopColor="red" />
                            <stop offset="100%" stopColor="red" />
                        </linearGradient>
                    </defs>
                    <Line type='monotone' dataKey='pv' stroke='url(#colorUv)' strokeWidth={2} dot={false} activeDot={false} />
                    <Tooltip />
                    <XAxis dataKey="name" />
                    {IsYAxis ?
                        <YAxis />
                        : null}
                </LineChart>
                </ResponsiveContainer>
            </Paper>
        );
    }
}


export default withStyles(styles)(LineCharts);;