import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from './CancelButtonStyles';
import { Tooltip } from '@material-ui/core';

class CancelButton extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this); 
    }
    handleClick(event) {
        this.props.cancel(event);
    }

    render() {
        const { classes, label } = this.props;
        return (
            <div className={classes.container}>
                <Tooltip title={label || 'Cancel'} classes={{ tooltip: classes.lightTooltip }}>
                    <Button className={classes.cancelButton} onClick={(event)=>this.handleClick(event)}>
                        {label || 'Cancel'}
                    </Button>
                </Tooltip>
            </div>
        );
    }
}

export default withStyles(styles)(CancelButton);