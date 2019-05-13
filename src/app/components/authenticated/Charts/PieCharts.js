import React, { Component } from 'react';
import {
    ResponsiveContainer, Cell, Tooltip,PieChart, Pie, Label
} from 'recharts';
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles';
import variables from '../../../styles/variables';


function CustomLabel({viewBox, count, text}){
    const {cx, cy} = viewBox;
    
    return (
     <text x={cx} y={cy} fill={variables.white}  textAnchor="middle" dominantBaseline="central">
        <tspan alignmentBaseline="middle" fontSize="26" x={"40%"} className={'number_fileld'} >{count}</tspan>
        <tspan fontSize="14" dy="1.4em" x={"40%"}>{text}</tspan>
     </text>
    )
  }

class PieCharts extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let classes = this.props.classes;
        let healthy = [{count: 1}];
        return (
            <div  className={classes.chatCnt}>
                <ResponsiveContainer width={"100%"} height={180} className={classes.pieContainer} >
                <PieChart  >

                    <Pie dataKey="count" data={(this.props.total === 0) ? healthy : this.props.data} cx={"40%"} cy={80} innerRadius={60} outerRadius={80}  >
                    <Label width={30} position="center"
                        content={<CustomLabel count={this.props.total} text={"TOTAL"}/>}>
                        </Label>
                        {
                            this.props.data.map((entry, index) => <Cell key={index} fill={(this.props.total === 0) ? '#66CC66' : this.props.color[index % this.props.color.length]} />)
                        }

                    </Pie>

                    <Tooltip />

                </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default withStyles(styles)(PieCharts);