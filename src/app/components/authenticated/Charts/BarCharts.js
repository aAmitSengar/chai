import React, { Component } from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';

import variables from '../../../styles/variables';

let i = 0;

function CustomLabel({ viewBox, data }) {
  const { x, y, width } = viewBox;
  if (i >= 3) {
    i = 0;
  }
  let count = data[i];
  i++;

  return (
    <text x={width/3+x} y={20} fill={variables.white} textAnchor="bottom" className={'number_fileld_resource'} dominantBaseline="hanging">
      {count.value || 0}
    </text>
  )
}

class BarCharts extends Component {

  constructor(props) {
    super(props);
  }

  setGraphColor(item) {
    if (item.color === 'red') {
      return variables.red;
    }
    if (item.color === 'orange') {
      return variables.orange;
    }
    if (item.color === 'darkyellow') {
      return variables.darkyellow;
    }
  }

  render() {
    let data = this.props.data;
    return (
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={this.props.data} >
          <Bar isAnimationActive={false} dataKey='value' label={<CustomLabel data={this.props.data} />}>
            {
              data.map((entry, index) => (
                <Cell cursor="pointer" fill={this.setGraphColor(entry)} key={`cell-${index}`} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>

    );
  }

}

export default BarCharts;