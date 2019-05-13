import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import FontAwesomeIcon from "react-fontawesome";
import styles from './Styles'

class MenuItems extends Component {

    render() {
        const { classes } = this.props;
        return (
            <ListItem className={classes.contextualMenuItem}>
                {this.props.icon && 
                     <FontAwesomeIcon name={"critical-note"} className={["fas fa-exclamation-triangle", classes[`${this.props.status}`]].join(' ')} />
                }               
                <div className={classes.submenuItem}>
                    <div className={[classes.menuChild, classes.menuLabel].join(' ')}>
                        {this.props.title}
                    </div>
                    <div className={[classes.menuChild, classes.rightAlign].join(' ')}>
                        {this.props.count}
                    </div>
                </div>
            </ListItem>
        )
    }
}

export default withStyles(styles)(MenuItems);