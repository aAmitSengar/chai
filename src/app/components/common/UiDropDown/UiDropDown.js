import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import styles from './UiDropDownStyle';

class UiDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: this.props.defaultSelectedItem || ''
        }
        this.openDropDown = this.openDropDown.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultSelectedItem !== this.props.defaultSelectedItem && nextProps.defaultSelectedItem) {
            this.setState({
                selectedItem: nextProps.defaultSelectedItem,

            });
        }

        if (nextProps.defaultSelectedItem !== this.props.defaultSelectedItem && nextProps.defaultSelectedItem === null) {
            this.setState({
                selectedItem: nextProps.defaultSelectedItem,

            });
        }
    }

    prepareFilterDropdown(item) {
        let classes = this.props.classes;
        let isAllDisabled = this.props.disabled || false;
        return (
            item.map((item, index) => {
                return (<DropdownItem  className= {item === 'Add New' || item === 'Add New Service' ? classes.color : ''} disabled={isAllDisabled && true} key={index} >{item}</DropdownItem>)
            })
        )
    }

    openDropDown(event) {
        let ItemValue = (event.currentTarget.textContent !== 'Select') ? (event.currentTarget.textContent || this.props.selected) : this.state.selectedItem 
        this.props.select(this.props.open, this.props.target, ItemValue);
        if (ItemValue) {
            this.setState({ selectedItem: ItemValue })
        }
    }

    render() {
        let classes = this.props.classes;
        return (
            <ButtonDropdown isOpen={this.props.open} style={{ width: this.props.width ? this.props.width : 157 }} className={[classes.select, this.props.error ? classes.error : ''].join(' ')} toggle={(event) => { this.openDropDown(event) }}>
                <DropdownToggle caret>
                    {!this.state.selectedItem ? "Select" : this.state.selectedItem}
                </DropdownToggle>
                <DropdownMenu className={[classes.dropDownCnt,'scrollbar'].join(' ')}>
                    {this.prepareFilterDropdown(this.props.item)}
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}

export default withStyles(styles)(UiDropDown);