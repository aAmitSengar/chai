import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    progressIndicator: {
        position: 'fixed',
        zIndex: '999',
        height: '2em',
        width: '2em',
        overflow: 'show',
        margin: 'auto',
        top: '0',
        left: "0",
        bottom: "0",
        right: '0',
    },
    container: {
        height: '100%',
        width: '100%',
        position: 'fixed',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9998,
        left: 0,
        top: 0,
    },
};

class Toast extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: this.props.show
        }
    }
    componentWillReceiveProps(nextProps) {
        // if (nextProps.show !== this.props.show) {
        this.setState({
            show: nextProps.show
        })
        // }
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            this.setState({ show: false });
        }
        this.setState({ show: false });
        if (typeof (this.props.closeTost) === 'function') {
            this.props.closeTost()
        }
    };

    render() {
        if (this.state.show) {
            return (
                <div style={styles.container}>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={this.state.show}
                        message={this.props.message}
                        autoHideDuration={4000}
                        onClose={(e, r) => { this.handleClose(e, r) }}
                    />
                </div>
            )

        } else {
            return (<div />)
        }
    }
}

export default withStyles(styles)(Toast);

