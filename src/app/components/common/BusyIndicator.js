import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
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

class BusyIndicator extends Component {
    render() {
        if (this.props.progress) {
            return (
                <div style={styles.container}>
                    <CircularProgress
                    style={styles.progressIndicator}
                    size={80}
                    status={this.props.status}
                />
                </div>
            )
        }
        return ( <div/>)        
    }
}

export default withStyles(styles)(BusyIndicator);