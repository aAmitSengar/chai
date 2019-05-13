import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import variables from '../../../styles/variables';

const styles = theme => ({
    button: {
        borderRadius: 2,
        backgroundColor:variables.blue,
        width:'auto',
        height: 41,
        minWidth:30,
        paddingLeft:20,
        paddingRight:20,
        whiteSpace: 'nowrap',
        fontSize:variables.fs_16,
        fontFamily:variables.primaryFont
    },
    disabled:{
        backgroundColor:`${variables.darakGray} !important`,
        color:`${variables.white} !important`
    }
  });
  

class UiButton extends Component {
    
    handleClick() {
         this.props.selectOp;
    }
    render() {
        let classes = this.props.classes;
        return(
            <Button variant="contained" classes={{disabled:classes.disabled}} disabled={this.props.disabled} onClick={() => this.props.selectOp() } color="primary"  className={classes.button}>
                {this.props.label}
            </Button>
        )
    }
}

UiButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(UiButton);