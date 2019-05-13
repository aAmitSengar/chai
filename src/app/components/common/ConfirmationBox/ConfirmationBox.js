import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import styles from './ConfirmationBoxStyle';
import DialogActions from '@material-ui/core/DialogActions';
//import Button from '@material-ui/core/Button';
import SubmitButton from '../Inputs/Buttons/SubmitButton'
import CancelButton from '../Inputs/Buttons/CancelButton'

class ConfirmationBox extends Component {
    constructor(props) {
        super(props)
        this.handleClose = this.handleClose.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }
    handleClose(event) {
        this.props.hangleClose();
    }
    handleOk(event) {
        this.props.handleOk(event.target.value);
    }
    render() {
        let classes = this.props.classes;
        return (
            <Dialog open={this.props.IsOpen} classes={{ paper: classes.rootDialogue }}>
                <h3 className={classes.dialogueHeading}>{this.props.title}</h3>
                <DialogContent className={classes.innerContainer}>
                    {this.props.children}
                </DialogContent>
                <DialogActions className={classes.dialogAction}>
                    <CancelButton cancel={(event) => this.handleClose(event)} label={this.props.cancelButton}>
                        {this.props.cancelButton}
                    </CancelButton>
                    <SubmitButton submit={(event) => this.handleOk(event)} label={this.props.okButton} autoFocus>
                        {this.props.okButton}
                    </SubmitButton>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(ConfirmationBox);