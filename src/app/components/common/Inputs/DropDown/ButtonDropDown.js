import React, { Component } from 'react'; 
import { withStyles } from '@material-ui/core/styles';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import styles from './ButtonDropDownStyles'; 


class ButtonDropDown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openDropDown: false,
            selectedData: this.props.formattedTime
        }
    }
    toggle(e) {
        this.setState({
            openDropDown: !this.state.openDropDown,
            selectedData: e.currentTarget.textContent
        })
        this.props.selectedValue(e.currentTarget.textContent)
    }
    prepareFilterDropdown(data) {
        return (
            data.map((item, index) => {
                return (<DropdownItem key={index}>{item}</DropdownItem>)
            })
        )
    }

    render() {
        let { classes, data } = this.props;

        return (
            <ButtonDropdown isOpen={this.state.openDropDown} className={[classes.select, classes.buttonDisplay].join(' ')} toggle={(event) => this.toggle(event)}>
                <DropdownToggle caret size="sm">
                    {this.state.selectedData}
                </DropdownToggle>
                <DropdownMenu>
                    {this.prepareFilterDropdown(data)}
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}

export default withStyles(styles)(ButtonDropDown);