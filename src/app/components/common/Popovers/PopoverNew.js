import React, { Component } from 'react';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles';

class Popovers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        }
    }

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    renderHeading(title) {
        const { classes } = this.props;
        if (title) {
            return (<label className={classes.popoverHeading}>{this.props.title}</label>);
        } else {
            return null;
        }
    }
    render() {
        const { classes } = this.props;
        // const { anchorEl } = this.state;

        return (
            <Popover
                open={Boolean(this.props.target)}
                anchorEl={this.props.target}
                onClose={this.props.handleClose}
                classes={{ paper: classes.paper }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {this.renderHeading(this.props.title)} 
                {this.props.children}

            </Popover>
        );
    }
}

export default withStyles(styles)(Popovers);