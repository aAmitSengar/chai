import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog'
import Zoom from '@material-ui/core/Zoom';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import styles from './Style';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";


class Dialogs extends Component {
    constructor(props) {
        super(props)
        this.handleClose = this.handleClose.bind(this);
    }

    Transition(props) {
        return <Zoom style={{ transformOrigin: "top left", transitionDelay: '50ms' }} {...props} />;
    }
    handleClose() {
        this.props.handleClose();
    }
    render() {
        let classes = this.props.classes;
        return (
            <Dialog
                fullScreen
                open={this.props.IsOpen}
                className={classes.rootDialogue}
                TransitionComponent={this.Transition} >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            onClick={this.handleClose}
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            variant="title"
                            color="inherit"
                            className={classes.flex}
                        >
                            {this.props.title}
                        </Typography>
                        {/* <Button color="inherit" onClick={this.handleClose}>
                            save
                            </Button> */}
                    </Toolbar>
                </AppBar>
                <DialogContent className={classes.innerContainer}>
                    {this.props.children}
                </DialogContent>
                {/* test */}
            </Dialog>
        );
    }
}

export default withStyles(styles)(Dialogs);