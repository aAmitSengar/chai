import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Close from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import styles from './Styles'
import _ from 'lodash';

class MultiSelectCollapsible extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            local_list: this.props.selectedItems.length > 0 ? this.props.selectedItems : this.props.items,// == null || this.props.selectedItems === '[]' ? this.props.items : JSON.parse(this.props.selectedItems || {})
        }
        this.renderMenues = this.renderMenues.bind(this)
        this.Ischecked = this.Ischecked.bind(this);
        this.selectAll = this.selectAll.bind(this);
    }
    handleClick = event => {
        console.log(event.target.value);
        this.setState(state => ({ open: !state.open }));
        // this.setState({ name: event.target.value });
        this.props.handleSelected(event.target.value)
    };
    selectAll(parentNode, target, event, expanded) {
        var rolesList = this.state.local_list;
        var selectedIndex = rolesList.indexOf(parentNode);
        _.set(rolesList[selectedIndex], 'isActive', target.checked)
        _.each(_.get(rolesList[selectedIndex], 'privileges'), function (privilege) {
            _.set(privilege, 'isActive', target.checked);
        });
        this.setState({
            local_list: rolesList,
            expanded: false
        });
        event.stopPropagation();
        this.props.setSelected(rolesList);
    }
    handleToggle = (value, parentNode) => () => {
        var itemIndex = parentNode.privileges.indexOf(value);
        var rolesList = this.state.local_list;
        var selectedIndex = rolesList.indexOf(parentNode);
        var isActive = _.get(rolesList[selectedIndex].privileges[itemIndex], 'isActive');
        _.set(rolesList[selectedIndex].privileges[itemIndex], 'isActive', !isActive)
        var isPArentSelected = _.some(_.get(parentNode, 'privileges'), item => item.isActive);
        _.set(parentNode, 'isActive', isPArentSelected)
        this.setState({
            local_list: rolesList
        });
        this.props.setSelected(rolesList);
    };
    Ischecked(item, parent) {
        var itemIndex = parent.privileges.indexOf(item);
        var parentIndex = this.state.local_list.indexOf(parent);
        var isActive = _.get(this.state.local_list[parentIndex].privileges[itemIndex], 'isActive') || false;
        return isActive
    }
    IsSelected(row) {
        var selectedItems = _.filter(row.privileges, item => item.isActive);
        return selectedItems.length === row.privileges.length;
    }
    IsInstermediateSelected(row) {
        var selectedItems = _.filter(row.privileges, item => item.isActive);
        return selectedItems.length > 0 && selectedItems.length < row.privileges.length;
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };
    renderMenues() {
        let myMenus = [];
        const { classes } = this.props;
        let { expanded } = this.state; 
        _.each(this.state.local_list, (k, v) => {
            myMenus.push(
                <ExpansionPanel key={`exppnl` + v} expanded={expanded === k.Name} className={classes.expansionPanel} onChange={this.handleChange(k.Name)} >
                    <ExpansionPanelSummary className={classes.expsmry} expandIcon={<ExpandMoreIcon />}>
                        <Typography disabled className={classes.heading}>{k.Name}

                        </Typography>
                        <Checkbox
                            checked={this.IsSelected(k)}
                            indeterminate={this.IsInstermediateSelected(k)}
                            tabIndex={-1}
                            onChange={(event) => this.selectAll(k, event.target, event, expanded)}
                            disableRipple
                            value="gilad"
                        />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className={classes.root1}>
                            {k.privileges.map(item => {
                                return (
                                    <ListItem
                                        key={item.name + '-' + v}
                                        role={undefined}
                                        dense
                                        button className={classes.listItem}
                                        onClick={this.handleToggle(item, k)}
                                    >
                                        <ListItemText primary={item.name} />
                                        <Checkbox
                                            checked={this.Ischecked(item, k)}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItem>
                                )
                            })}
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
        })
        return myMenus;
    }
    renderSelected() {
        const { classes } = this.props;
        return (<Paper className={classes.expansionPanel}>
            {_.some(this.state.local_list, item => _.some(_.get(item, 'privileges'), prev => prev.isActive)) ?
                <List className={classes.rolesList}>
                    {this.state.local_list.map(item => (
                        _.map(_.get(item, 'privileges'), function (prev) {
                            return (prev.isActive ?
                                <ListItem key={prev.name} dense button className={classes.listItem}>
                                    <ListItemText primary={prev.name} />
                                    <ListItemSecondaryAction>
                                        <ListItemIcon >
                                            <Close onClick={this.handleToggle(prev, item)} />
                                        </ListItemIcon>
                                    </ListItemSecondaryAction>
                                    {/* <Divider classes={{
                                        inset: false,
                                        root: classes.dividerClass
                                    }} /> */}
                                </ListItem>
                                :
                                null)
                        }.bind(this))
                    ))}
                </List>
                :
                null
            }
        </Paper>);
    }

    render() {
        const { classes } = this.props;
        return (
            <div><h3 className={classes.selectedCounter}>
                {_.chain(this.state.local_list).map(item => item.privileges).flatten().filter(item => item.isActive).value().length}
                <span className={classes.selectedHeading}> Privileges selected</span></h3>
                <div className={classes.root}>
                    <div className={classes.container1}>
                        {this.renderMenues()}
                    </div>
                    {/* {this.state.checked.length > 0 ? */}
                    <div className={classes.container2}>
                        {this.renderSelected()}
                    </div>
                    {/* :
                    null} */}
                </div>
            </div>
        );
    }
}

MultiSelectCollapsible.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultiSelectCollapsible);