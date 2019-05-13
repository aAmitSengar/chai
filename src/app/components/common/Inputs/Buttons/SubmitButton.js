import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from './SubmitButtonStyles';
// import { Tooltip } from '@material-ui/core';
import hasPermission from '../../../../utils/AuthPermissions';

class SubmitButton extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        this.props.submit(event);
    };
    hasPermission() {
        const { RoleKey, RoleAction } = this.props;
        return hasPermission(RoleKey || 'KPI', RoleAction || 'VIEW');
    }
    render() {
        const { classes, label, disabled } = this.props;

        return (
            <div className={classes.container}>
                {this.hasPermission() ?
                    // <Tooltip title={label || 'Submit'} classes={{ tooltip: classes.lightTooltip }}>
                        <Button className={label === 'Acknowledge' ? classes.customButton : classes.submitButton} disabled={disabled || false}
                            onClick={(event) => this.handleClick(event)}>
                            {label}
                        </Button>
                    // </Tooltip>
                    :
                    null}
            </div>
        );
    }
}

export default withStyles(styles)(SubmitButton);