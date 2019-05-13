import React, { Component } from 'react';
import styles from './Styles';
import { withStyles } from '@material-ui/core/styles';
import CustomTextField from '../Inputs/TextInput/CustomTextField';
import _ from 'lodash';
import Search from '@material-ui/icons/Search'

class TableSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySearchBox: true
        }
        this.reduseSize = this.reduseSize.bind(this);
        this.renderSearchIcon = this.renderSearchIcon.bind(this);
    }

    handleChanges_search(value) {
        var list = this.props.list;
        var newlist = _.filter(list, item => {
            var isFound = false;
            _.forOwn(item, kk => {
                if ((kk || '').toString().toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                    isFound = true
                }
            })
            return isFound
        });
        this.props.updated(newlist);
    }
    displaySearch() {
        this.setState({
            displaySearchBox: true
        })
    }
    reduseSize() {
        const { classes } = this.props;
        // const { displaySearchBox } = this.state;
        // return displaySearchBox ? classes.searchIconDiv_small : classes.searchIconDiv;
        return classes.searchIconDiv_small;
    }
    renderSearchIcon() {
        const { classes } = this.props;
        return (
            <div className={this.reduseSize()}>
                <Search className={classes.searchIcon}
                    onClick={this.displaySearch.bind(this)}
                />
            </div>
        );
    }

    render() {
        const { classes, tableType } = this.props;
        const { displaySearchBox } = this.state;
        return (
            <div className={tableType !== "ALERT_TABLE" ? classes.textField : classes.textField1}>
                {this.renderSearchIcon()}
                {displaySearchBox ?
                    <CustomTextField
                        label="Search" defaultValue=""
                        type="text"
                        UpdateValues={this.handleChanges_search.bind(this)}
                    />
                    : null}
            </div>
        );
    }

}

export default withStyles(styles)(TableSearch);