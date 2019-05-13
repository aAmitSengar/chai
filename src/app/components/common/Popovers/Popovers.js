import React, { Component } from 'react';
import { Popover, PopoverBody } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles';

class Popovers extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: this.props.popoverOpen
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }
    toggle() {
        let isOpen = !this.state.popoverOpen
        this.setState({
            popoverOpen: isOpen
        });
        if(typeof(this.props.cancelPoppover) === 'function')
        this.props.cancelPoppover(isOpen); 
    }

    // componentWillMount() {
    //     document.body.addEventListener('click', this.myHandler.bind(this));
    // }
    // componentWillUnmount() {
    //     document.body.removeEventListener('click', this.myHandler.bind(this));
    // }
    // myHandler(event) {
    //     this.setState({
    //         popoverOpen: false
    //     })
    //     if(this.props.toggle){
    //         this.props.toggle()
    //     }  
    // }

    render() {
        let { classes, placement } = this.props;
        return (
            <Popover
                placement={placement || "bottom"}
                isOpen={this.state.popoverOpen}
                target={this.props.target}
                toggle={this.toggle}
                className={classes.popover}>
                {this.props.title !== undefined && this.props.title !== '' && this.props.title !== null?
                    <label className={classes.popoverHeading}>{this.props.title}</label>
                    : null
                }
                <PopoverBody>
                    {this.props.children}
                </PopoverBody>
            </Popover>
        );
    }
}

export default withStyles(styles)(Popovers);