import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import styles from './style'

class Drawers extends React.Component {
    toggleDrawer = () => {
        this.props.closeDrawer();
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                {/* <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button> */}
                <Drawer classes={{
                    paper: classes.paper,
                    modal: classes.modal
                }} open={this.props.open} anchor={this.props.anchor} onClose={this.toggleDrawer.bind(this)} >
                    {this.props.children}
                </Drawer>
            </div>
        );
    }
}

Drawers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Drawers);