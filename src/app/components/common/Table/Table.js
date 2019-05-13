import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import styles from './TableStyle';
import _ from "lodash";

class fieldTable extends Component {

    handleClick() {
        this.props.closeDrawer();
    }
    render() {
        const { classes, fieldTableData } = this.props;
        let data = _.chain(fieldTableData).get('_source.fields').map((item, key) => {
            return { key, number: item.number, format: item.format, keys: item.Keys }
        }).value();
        return (
            <Table className={classes.tableClass}>
                <thead>
                    <tr className={classes.headerClass}>
                        <th >Field No</th>
                        <th >Field Name</th>
                        <th >Data Type</th>
                        <th >Value</th>
                    </tr>
                </thead>
                <tbody className={classes.tbodyClass}>
                    {
                        data.map((n, i) => {
                            return (
                                <tr key={i}>
                                    <td>{n.number}</td>
                                    <td>{n.key}</td>
                                    <td>{n.format}</td>
                                    <td>{ <span key={i + 'span'}>{_.join(n.keys,', ')}</span>}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        );
    }
}

export default withStyles(styles)(fieldTable);